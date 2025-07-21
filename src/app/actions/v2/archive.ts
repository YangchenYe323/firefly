"use server";

import type { LiveRecordingArchive, Prisma } from "@prisma/client";
import type { ActionReturnTypeBase } from "../types";
import prisma from "@/db";

interface ListArchivesReturnType extends ActionReturnTypeBase {
    archives?: LiveRecordingArchive[];
    nextToken?: string;
}

/**
 * List archives of a given vtuber. This is a paginated API.
 * 
 * @param vtuberProfileId - The id of the vtuber to list archives for
 * @param pageToken - The token to continue from the last page
 * @param limit - The number of archives to fetch per page
 * @param afterDate - The date to start fetching archives from
 */
export async function listArchives(
    vtuberProfileId: number,
    pageToken?: string,
    limit = 20,
    afterDate?: number | string | undefined,
): Promise<ListArchivesReturnType> {
    // If present, parse the afterDate filter, this gets translated to a WHERE date >= afterDate clause
    // so we only get archives after the given date
    const afterDateFilter = parseDateAfterFilter(afterDate);

    // If present, parse the pageToken, this gets translated to a WHERE pubdate < pageToken clause
    // so we only get occurrences before the given date (the last occurrence in the previous page)
    let dateFilter: { date: { lt: Date } } | undefined;
    if (pageToken) {
        try {
            const decodedToken = Buffer.from(pageToken, "base64").toString("utf-8");
            const date = new Date(decodedToken);

            if (Number.isNaN(date.getTime())) {
                return { success: false, message: "Invalid pagination token" };
            }

            dateFilter = { date: { lt: date } };
        } catch (error) {
            return { success: false, message: "Invalid pagination token format" };
        }
    }

    const whereClauses: Prisma.LiveRecordingArchiveWhereInput[] = [];

    if (afterDateFilter) {
        whereClauses.push(afterDateFilter);
    }

    if (dateFilter) {
        whereClauses.push(dateFilter);
    }

    const archives = await prisma.liveRecordingArchive.findMany({
        where: {
            vtuberProfileId,
            AND: whereClauses,
        },
        orderBy: {
            date: "desc",
        },
        take: limit + 1, // Take one extra to determine if there are more pages
    });

    // Check if there are more pages
    const hasMore = archives.length > limit;
    const results = hasMore ? archives.slice(0, limit) : archives;

    // Generate next token if there are more results
    let nextToken: string | undefined;
    if (hasMore && results.length > 0) {
        const lastArchive = results[results.length - 1];
        const tokenData = lastArchive.date.toISOString();
        nextToken = Buffer.from(tokenData, "utf-8").toString("base64");
    }

    return { success: true, archives: results, nextToken };
}

function parseDateAfterFilter(afterDate?: number | string | undefined): { date: { gte: Date } } | undefined {
    if (!afterDate) {
        return undefined;
    }

    const date = new Date(afterDate);
    if (Number.isNaN(date.getTime())) {
        return undefined;
    }

    return { date: { gte: date } };
}