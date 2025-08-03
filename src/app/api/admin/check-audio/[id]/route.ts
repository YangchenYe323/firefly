import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/db";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const authResult = await auth();
	if (!authResult) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const recordingId = Number.parseInt(params.id);
	        if (Number.isNaN(recordingId)) {
		return NextResponse.json({ error: "Invalid recording ID" }, { status: 400 });
	}

	const recording = await prisma.liveRecordingArchive.findUnique({
		where: { id: recordingId },
		select: { audioObjectKeys: true }
	});

	if (!recording) {
		return NextResponse.json({ error: "Recording not found" }, { status: 404 });
	}

	return NextResponse.json({
		hasAudio: recording.audioObjectKeys.length > 0,
		audioCount: recording.audioObjectKeys.length
	});
} 