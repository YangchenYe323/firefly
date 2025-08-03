import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getBiliWebKeys, getStreamUrl, FeatureValue, getVideoInfo } from "@/lib/bilibili";
import r2 from "@/r2";
import { toZonedTime } from "date-fns-tz";
import { AbortMultipartUploadCommand, CompleteMultipartUploadCommand, CreateMultipartUploadCommand, HeadObjectCommand, UploadPartCommand } from "@aws-sdk/client-s3";
import prisma from "@/db";
import { Readable } from "node:stream";

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

    // Set up SSE response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        start(controller) {
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
                        for (let i = 0; i < contentLengthNumber; i += chunkSize) {
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

                        const multipartUpload = await r2.send(new CreateMultipartUploadCommand({
                            Bucket: process.env.FIREFLY_RECORDING_BUCKET!,
                            Key: objectKey,
                            ContentType: selectedAudio.mime_type,
                            ChecksumAlgorithm: undefined,
                        }));

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

                                    const progressStream = new Readable({
                                        async read() {
                                            try {
                                                const { done, value } = await streamReader.read();
                                                if (done) {
                                                    this.push(null); // End of stream
                                                } else {
                                                    uploadedBytes += value.length;
                                                    const chunkProgress = (uploadedBytes / chunkSize) * 100;

                                                    // Send progress update every 1MB or when complete
                                                    if (uploadedBytes % (1024 * 1024) === 0 || uploadedBytes === chunkSize) {
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
                                    }));

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
                            }));

                            sendEvent("page_complete", {
                                streamId,
                                objectKey,
                                message: `${objectKey} 上传成功`
                            });
                            objectKeys.push(objectKey);
                        } catch (error) {
                            sendEvent("page_error", {
                                streamId,
                                message: `上传音频文件失败: ${error}`
                            });
                            if (multipartUpload.UploadId) {
                                await r2.send(new AbortMultipartUploadCommand({
                                    Bucket: process.env.FIREFLY_RECORDING_BUCKET!,
                                    Key: objectKey,
                                    UploadId: multipartUpload.UploadId,
                                }));
                            							}
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
                    controller.close();
                } catch (error) {
                    sendEvent("error", { message: `处理失败: ${error}` });
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