"use server";

import { auth } from "@/lib/auth";
import { getBiliWebKeys, getStreamUrl, FeatureValue, getVideoInfo } from "@/lib/bilibili";
import { LiveRecordingArchive } from "@prisma/client";
import { ActionReturnTypeBase } from "../types";
import r2 from "@/r2";
import { toZonedTime } from "date-fns-tz";
import { AbortMultipartUploadCommand, CompleteMultipartUploadCommand, CreateMultipartUploadCommand, HeadObjectCommand, UploadPartCommand } from "@aws-sdk/client-s3";
import prisma from "@/db";
import { Readable } from "stream";

interface StreamVideoToR2ReturnType extends ActionReturnTypeBase {
	recording?: LiveRecordingArchive;
}

export async function streamVideoToR2(recording: LiveRecordingArchive): Promise<StreamVideoToR2ReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return { success: false, message: "请先登录" };
	}

	if (recording.audioObjectKeys.length > 0) {
		return { success: true, recording };
	}

	const info = await getVideoInfo({ bvid: recording.bvid });
	if (info.code !== 0) {
		return { success: false, message: `获取视频信息失败: ${info.message}` };
	}

	const wbiKeys = await getBiliWebKeys();

	const data = info.data!;
	if (data.pages.length === 0) {
		return { success: false, message: "视频没有分P" };
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

		console.log("objectKey", objectKey);
		// Check if the object already exists
		try {
			const headObject = await r2.send(new HeadObjectCommand({
				Bucket: process.env.FIREFLY_RECORDING_BUCKET!,
				Key: objectKey,
			}));

			if (headObject.ContentLength) {
				console.log(`音频文件 ${objectKey} 已存在`);
				objectKeys.push(objectKey);
				continue;
			}
		} catch (error) {
			// Ignore
		}

		const streamUrl = await getStreamUrl(recording.bvid, page.cid, FeatureValue.allDash(), wbiKeys);

		if (!streamUrl.dash || streamUrl.dash.audio.length === 0) {
			return { success: false, message: "获取音频流失败" };
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
			return { success: false, message: "获取音频长度失败" };
		}
		const contentLengthNumber = parseInt(contentLength);

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
						throw new Error(`获取音频流失败: ${streamRangeResponse.statusText}, ${streamRangeResponse.body}`);
					}
					const stream = streamRangeResponse.body;
					if (!stream) {
						throw new Error("获取音频流失败");
					}
					const uploadPart = await r2.send(new UploadPartCommand({
						Bucket: process.env.FIREFLY_RECORDING_BUCKET!,
						Key: objectKey,
						PartNumber: i + 1,
						UploadId: multipartUpload.UploadId,
						Body: webStreamToNodeReadable(stream),
						ContentLength: chunk[1] - chunk[0] + 1,
					}))
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

			console.log(`${objectKey} 上传成功`);
			objectKeys.push(objectKey);
		} catch (error) {
			console.log("上传音频文件失败，清理上传任务: ", error);
			if (multipartUpload.UploadId) {
				await r2.send(new AbortMultipartUploadCommand({
					Bucket: process.env.FIREFLY_RECORDING_BUCKET!,
					Key: objectKey,
					UploadId: multipartUpload.UploadId,
				}));
			}

			return { success: false, message: `上传音频文件失败: ${error}` };
		}
	}

	console.log("上传任务全部成功，更新数据库");

	// Update the recording with the new audio object keys.
	const updatedRecording = await prisma.liveRecordingArchive.update({
		where: { id: recording.id },
		data: {
			audioObjectKeys: objectKeys,
		}
	});

	return { success: true, recording: updatedRecording };
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