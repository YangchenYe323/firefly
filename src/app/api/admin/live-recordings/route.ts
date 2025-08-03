import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/db";

export async function GET(request: NextRequest) {
	const authResult = await auth();
	if (!authResult) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { searchParams } = new URL(request.url);
	const profileId = searchParams.get("profileId");

	if (!profileId) {
		return NextResponse.json({ error: "Profile ID is required" }, { status: 400 });
	}

	try {
		const recordings = await prisma.liveRecordingArchive.findMany({
			where: {
				vtuberProfileId: Number.parseInt(profileId),
			},
			orderBy: {
				pubdate: "desc",
			},
		});

		return NextResponse.json({ recordings });
	} catch (error) {
		console.error("Error fetching live recordings:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	const authResult = await auth();
	if (!authResult) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await request.json();
		const { vtuberProfileId, bvid, title, pubdate, date, duration, cover } = body;

		const recording = await prisma.liveRecordingArchive.create({
			data: {
				vtuberProfileId: Number.parseInt(vtuberProfileId),
				bvid,
				title,
				pubdate: Number.parseInt(pubdate),
				date: new Date(date),
				duration: Number.parseInt(duration),
				cover,
			},
		});

		return NextResponse.json({ recording });
	} catch (error) {
		console.error("Error creating live recording:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
} 