import { PrismaClient } from "@prisma/client";

// Extra fields on the song data type, could add more in the future!
export type SongExtra = {
	// Number of ️❤️s
	numLikes?: number;
	// Number of 😅️️s
	numDislikes?: number;
	// ISO Date string of the Bilibili video timestamp for this song
	video_created_on?: string;
	// Object store url for the source file of this song
	bucket_url?: string;
};

declare global {
	namespace PrismaJson {
		type SongExtraType = SongExtra;
	}
}

const prismaClientSingleton = () => {
	return new PrismaClient();
};

declare global {
	var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
