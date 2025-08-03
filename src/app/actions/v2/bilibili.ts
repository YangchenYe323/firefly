"use server";

import { getBiliWebKeys } from "@/lib/bilibili";

export async function getBilibiliWbiKeys() {
	try {
		const wbiKeys = await getBiliWebKeys();
		return { success: true, data: wbiKeys };
	} catch (error) {
		return { 
			success: false, 
			error: error instanceof Error ? error.message : "Unknown error occurred" 
		};
	}
}
