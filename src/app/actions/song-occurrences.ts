"use server";

import type { ActionReturnTypeBase } from "./types";
import prisma from "@/db";

export interface SongOccurrence {
	bvid: string;
	cover: string;
	page: number;
	duration: number;
	start: number;
	title: string;
	pubdate: number;
}

export interface SongOccurrencesReturnType extends ActionReturnTypeBase {
	occurrences?: SongOccurrence[];
	nextToken?: string;
	message?: string;
}

/**
 * Fetch song occurrences with keyset pagination
 *
 * @param songId - The ID of the song to fetch occurrences for
 * @param pageToken - Base64 encoded pubdate for pagination (optional)
 * @param limit - Number of records to fetch (default: 20)
 * @returns Paginated list of song occurrences with recording metadata
 */
export async function getSongOccurrences(
	songId: number,
	pageToken?: string,
	limit = 20,
): Promise<SongOccurrencesReturnType> {
	try {
		// Decode the page token to get the pubdate for keyset pagination
		let pubdateFilter: { pubdate: { lt: number } } | undefined;

		if (pageToken) {
			try {
				const decodedToken = Buffer.from(pageToken, "base64").toString("utf-8");
				const pubdate = Number.parseInt(decodedToken, 10);

				if (Number.isNaN(pubdate)) {
					return {
						success: false,
						message: "Invalid pagination token",
					};
				}

				pubdateFilter = { pubdate: { lt: pubdate } };
			} catch (error) {
				return {
					success: false,
					message: "Invalid pagination token format",
				};
			}
		}

		// Fetch occurrences with recording metadata using efficient join
		const occurrences = await prisma.songOccurrenceInLive.findMany({
			where: {
				songId: songId,
				liveRecordingArchive: pubdateFilter,
			},
			include: {
				liveRecordingArchive: {
					select: {
						bvid: true,
						cover: true,
						duration: true,
						pubdate: true,
						title: true,
					},
				},
			},
			orderBy: [
				{
					liveRecordingArchive: {
						pubdate: "desc",
					},
				},
				{
					start: "asc",
				},
			],
			take: limit + 1, // Take one extra to determine if there are more pages
		});

		// Check if there are more pages
		const hasMore = occurrences.length > limit;
		const results = hasMore ? occurrences.slice(0, limit) : occurrences;

		// Transform the data to match the expected interface
		const transformedOccurrences: SongOccurrence[] = results.map(
			(occurrence) => ({
				bvid: occurrence.liveRecordingArchive.bvid,
				cover: occurrence.liveRecordingArchive.cover,
				page: occurrence.page,
				duration: occurrence.liveRecordingArchive.duration,
				start: occurrence.start,
				title: occurrence.liveRecordingArchive.title,
				pubdate: occurrence.liveRecordingArchive.pubdate,
			}),
		);

		// Generate next token if there are more results
		let nextToken: string | undefined;
		if (hasMore && results.length > 0) {
			const lastOccurrence = results[results.length - 1];
			const tokenData = lastOccurrence.liveRecordingArchive.pubdate.toString();
			nextToken = Buffer.from(tokenData, "utf-8").toString("base64");
		}

		return {
			success: true,
			occurrences: transformedOccurrences,
			nextToken,
		};
	} catch (error) {
		console.error("Error fetching song occurrences:", error);
		return {
			success: false,
			message: "Failed to fetch song occurrences",
		};
	}
}
