import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/db";

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const authResult = await auth();
	if (!authResult) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await request.json();
		const { title, pubdate, date, duration, cover } = body;

		const recording = await prisma.liveRecordingArchive.update({
			where: { id: Number.parseInt(params.id) },
			data: {
				title,
				pubdate: Number.parseInt(pubdate),
				date: new Date(date),
				duration: Number.parseInt(duration),
				cover,
			},
		});

		return NextResponse.json({ recording });
	} catch (error) {
		console.error("Error updating live recording:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const authResult = await auth();
	if (!authResult) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		await prisma.liveRecordingArchive.delete({
			where: { id: Number.parseInt(params.id) },
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error deleting live recording:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
} 