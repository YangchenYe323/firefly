import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getBiliWebKeys, getStreamUrl, FeatureValue, getVideoInfo } from "@/lib/bilibili";
import r2 from "@/r2";
import { toZonedTime } from "date-fns-tz";
import { AbortMultipartUploadCommand, CompleteMultipartUploadCommand, CreateMultipartUploadCommand, HeadObjectCommand, UploadPartCommand } from "@aws-sdk/client-s3";
import prisma from "@/db";
import { Readable } from "node:stream";

/**
 * SSE endpoint for streaming audio to firefly-managed r2 bucket for a given recording.
 * 
 * @param request 
 * @returns 
 */
export async function POST(request: NextRequest) {
    const authResult = await auth();
    if (!authResult) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { recordingId } = await request.json();
    if (!recordingId) {
        return NextResponse.json({ error: "Recording ID is required" }, { status: 400 });
    }

    const recording = await prisma.liveRecordingArchive.findUnique({
        where: { id: recordingId }
    });
    if (!recording) {
        return NextResponse.json({ error: "Recording not found" }, { status: 404 });
    }

    if (recording.audioObjectKeys.length > 0) {
        return NextResponse.json({ error: "Audio already exists" }, { status: 400 });
    }

    const { signal } = request;

    // Set up SSE response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        start(controller) {
            // Check if already aborted
            if (signal.aborted) {
                controller.close();
                return;
            }

            signal.addEventListener("abort", () => {
                controller.close();
            });

            const sendEvent = (event: string, data: any) => {
                const message = `data: ${JSON.stringify({ event, data })}\n\n`;
                controller.enqueue(encoder.encode(message));
            };

            const processStream = async () => {
                try {
                    sendEvent("start", { recordingId, bvid: recording.bvid });

                    const info = await getVideoInfo({ bvid: recording.bvid });
                    if (info.code !== 0) {
                        sendEvent("error", { message: `获取视频信息失败: ${info.message}` });
                        controller.close();
                        return;
                    }

                    const wbiKeys = await getBiliWebKeys();
                    const data = info.data!;

                    if (data.pages.length === 0) {
                        sendEvent("error", { message: "视频没有分P" });
                        controller.close();
                        return;
                    }

                    // Object key format: audio/[mid]/[year]/[month]/[day]/[bvid]/[page_number].mp4
                    const pubdate = data.pubdate;
                    const pubdateDate = new Date(pubdate * 1000);
                    const pubdateShanghaiDate = toZonedTime(pubdateDate, "Asia/Shanghai");
                    const year = pubdateShanghaiDate.getFullYear();
                    const month = pubdateShanghaiDate.getMonth() + 1;
                    const day = pubdateShanghaiDate.getDate();

                    const objectKeys = [];

                    for (const page of data.pages) {
                        const objectKey = `audio/${data.owner.mid}/${year}/${month}/${day}/${recording.bvid}/${page.page}.mp4`;
                        const streamId = `${recording.bvid}/${page.page}`;

                        sendEvent("page_start", {
                            streamId,
                            pageNumber: page.page,
                            objectKey,
                            totalPages: data.pages.length
                        });

                        // Check if the object already exists
                        try {
                            const headObject = await r2.send(new HeadObjectCommand({
                                Bucket: process.env.FIREFLY_RECORDING_BUCKET!,
                                Key: objectKey,
                            }));

                            if (headObject.ContentLength) {
                                sendEvent("page_skip", {
                                    streamId,
                                    message: `音频文件 ${objectKey} 已存在`
                                });
                                objectKeys.push(objectKey);
                                continue;
                            }
                        } catch (error) {
                            // Ignore
                        }

                        const streamUrl = await getStreamUrl(recording.bvid, page.cid, FeatureValue.allDash(), wbiKeys);

                        if (!streamUrl.dash || streamUrl.dash.audio.length === 0) {
                            sendEvent("page_error", {
                                streamId,
                                message: "获取音频流失败"
                            });
                            continue;
                        }

                        const selectedAudio = streamUrl.dash?.audio[0];
                        const audioUrl = selectedAudio.base_url;

                        // First query the audio url once to get the content length
                        const audioResponse = await fetch(audioUrl, {
                            signal,
                            headers: {
                                Cookie: `SESSDATA=${process.env.BILI_CRED_SESSDATA}`,
                                Referer: "https://www.bilibili.com/",
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                            }
                        });
                        const contentLength = audioResponse.headers.get("Content-Length");
                        if (!contentLength) {
                            sendEvent("page_error", {
                                streamId,
                                message: "获取音频长度失败"
                            });
                            continue;
                        }
                        const contentLengthNumber = Number.parseInt(contentLength);

                        // Chunk the audio into 20MB chunks and upload concurrently
                        const chunkSize = 20 * 1024 * 1024;
                        const chunks = [];
                        for (let i = 0; i < contentLengthNumber; i += chunkSize + 1) {
                            if (i + chunkSize > contentLengthNumber - 1) {
                                chunks.push([i, contentLengthNumber - 1]);
                            } else {
                                chunks.push([i, i + chunkSize]);
                            }
                        }

                        sendEvent("page_chunks_ready", {
                            streamId,
                            totalChunks: chunks.length,
                            totalSize: contentLengthNumber,
                            chunks: chunks.map((chunk, index) => ({
                                chunkId: `${streamId}_chunk_${index + 1}`,
                                chunkIndex: index + 1,
                                startByte: chunk[0],
                                endByte: chunk[1],
                                size: chunk[1] - chunk[0] + 1
                            }))
                        });

                        // Empirically, the bandwidth bilibili streaming can achive is abysmal, like
                        // 300kb/s. We devide pages into 20MB chunks, and bilibili now roughly chunk up
                        // videos into pages of 2 hours each. The aggregate bandwidth we typically get from
                        // all the parallel streams is ~1MB/s. We set a timeout so that we can finsih one page
                        // in one request. Normally each page takes 30-60 seconds and each video has 2-3 pages,
                        // so we can upload a whole video in one request. If some good vtubers streams 20 hours in one shot,
                        // we need to do it in multiple requests, because our free vercel plan only does 300 seconds of execution time.
                        // So it is important we keep finished pages in r2 and only upload the unfinished ones.
                        const multipartUpload = await r2.send(new CreateMultipartUploadCommand({
                            Bucket: process.env.FIREFLY_RECORDING_BUCKET!,
                            Key: objectKey,
                            ContentType: selectedAudio.mime_type,
                            ChecksumAlgorithm: undefined,
                        }), {
                            abortSignal: signal,
                            requestTimeout: 5 * 60 * 1000, // 5 minutes
                        });

                        try {
                            const updatePromises = [];
                            for (let i = 0; i < chunks.length; i++) {
                                const chunk = chunks[i];
                                const task = async () => {
                                    const streamRangeResponse = await fetch(audioUrl, {
                                        headers: {
                                            Cookie: `SESSDATA=${process.env.BILI_CRED_SESSDATA}`,
                                            Referer: "https://www.bilibili.com/",
                                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                                            Range: `bytes=${chunk[0]}-${chunk[1]}`,
                                        }
                                    });
                                    if (!streamRangeResponse.ok) {
                                        throw new Error(`获取音频流失败: ${streamRangeResponse.statusText}`);
                                    }
                                    const stream = streamRangeResponse.body;
                                    if (!stream) {
                                        throw new Error("获取音频流失败");
                                    }

                                    // Create a reader for the web stream
                                    const streamReader = stream.getReader();

                                    // Create a progress tracking stream wrapper
                                    const chunkSize = chunk[1] - chunk[0] + 1;
                                    let uploadedBytes = 0;

                                    // Send initial progress event to show chunk is starting
                                    console.log(`Starting chunk upload: ${streamId}_chunk_${i + 1}, size: ${chunkSize} bytes`);
                                    sendEvent("chunk_progress", {
                                        streamId,
                                        chunkId: `${streamId}_chunk_${i + 1}`,
                                        chunkIndex: i + 1,
                                        totalChunks: chunks.length,
                                        uploadedBytes: 0,
                                        totalChunkSize: chunkSize,
                                        chunkProgress: 0,
                                    });

                                    const progressStream = new Readable({
                                        async read() {
                                            try {
                                                // Check for cancellation
                                                if (signal.aborted) {
                                                    this.destroy(new Error("Upload cancelled"));
                                                    return;
                                                }

                                                const { done, value } = await streamReader.read();
                                                if (done) {
                                                    this.push(null); // End of stream
                                                } else {
                                                    uploadedBytes += value.length;
                                                    const chunkProgress = (uploadedBytes / chunkSize) * 100;

                                                    // Send progress update every 256KB or when complete
                                                    if (uploadedBytes % (256 * 1024) === 0 || uploadedBytes === chunkSize) {
                                                        sendEvent("chunk_progress", {
                                                            streamId,
                                                            chunkId: `${streamId}_chunk_${i + 1}`,
                                                            chunkIndex: i + 1,
                                                            totalChunks: chunks.length,
                                                            uploadedBytes,
                                                            totalChunkSize: chunkSize,
                                                            chunkProgress,
                                                        });
                                                    }

                                                    this.push(Buffer.from(value));
                                                }
                                            } catch (error) {
                                                this.destroy(error as Error);
                                            }
                                        }
                                    });

                                    const uploadPart = await r2.send(new UploadPartCommand({
                                        Bucket: process.env.FIREFLY_RECORDING_BUCKET!,
                                        Key: objectKey,
                                        PartNumber: i + 1,
                                        UploadId: multipartUpload.UploadId,
                                        Body: progressStream,
                                        ContentLength: chunkSize,
                                    }), {
                                        abortSignal: signal,
                                        requestTimeout: 5 * 60 * 1000, // 5 minutes
                                    });

                                    sendEvent("chunk_complete", {
                                        streamId,
                                        chunkId: `${streamId}_chunk_${i + 1}`,
                                        chunkIndex: i + 1,
                                        totalChunks: chunks.length,
                                        uploadedBytes: chunkSize,
                                        totalChunkSize: chunkSize,
                                    });

                                    return {
                                        ETag: uploadPart.ETag,
                                        PartNumber: i + 1,
                                    };
                                }
                                updatePromises.push(task());
                            }

                            const uploadParts = await Promise.all(updatePromises);
                            // Sort parts by PartNumber to ensure correct order
                            const sortedParts = uploadParts.sort((a, b) => a.PartNumber - b.PartNumber);

                            const object = await r2.send(new CompleteMultipartUploadCommand({
                                Bucket: process.env.FIREFLY_RECORDING_BUCKET!,
                                Key: objectKey,
                                UploadId: multipartUpload.UploadId,
                                MultipartUpload: {
                                    Parts: sortedParts,
                                }
                            }), {
                                abortSignal: signal,
                                requestTimeout: 1 * 60 * 1000, // 1 minute
                            });

                            sendEvent("page_complete", {
                                streamId,
                                objectKey,
                                message: `${objectKey} 上传成功`
                            });
                            objectKeys.push(objectKey);
                        } catch (error) {
                            // Clean up the multipart upload
                            if (multipartUpload.UploadId) {
                                try {
                                    await r2.send(new AbortMultipartUploadCommand({
                                        Bucket: process.env.FIREFLY_RECORDING_BUCKET!,
                                        Key: objectKey,
                                        UploadId: multipartUpload.UploadId,
                                    }));
                                } catch (cleanupError) {
                                    console.error("Failed to cleanup multipart upload:", cleanupError);
                                }
                            }

                            if (!signal.aborted) {
                                sendEvent("page_error", {
                                    streamId,
                                    message: `上传音频文件失败: ${error}`
                                });
                            }

                            // It's important we DO NOT update the database here, otherwise we are left with
                            // stale database entry that is not the complete set of audios.
                            throw error;
                        }
                    }

                    // Update the recording with the new audio object keys
                    const updatedRecording = await prisma.liveRecordingArchive.update({
                        where: { id: recording.id },
                        data: {
                            audioObjectKeys: objectKeys,
                        }
                    });

                    sendEvent("complete", {
                        recordingId,
                        objectKeys,
                        recording: updatedRecording
                    });
                } finally {
                    controller.close();
                }
            };

            processStream();
        }
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    });
}

// Helper function to convert Web ReadableStream to Node.js Readable stream
function webStreamToNodeReadable(webStream: ReadableStream<Uint8Array>): Readable {
    const reader = webStream.getReader();

    return new Readable({
        async read() {
            try {
                const { done, value } = await reader.read();
                if (done) {
                    this.push(null); // End of stream
                } else {
                    this.push(Buffer.from(value));
                }
            } catch (error) {
                this.destroy(error as Error);
            }
        }
    });
} 