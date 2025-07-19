/*
  Warnings:

  - You are about to drop the column `created_on` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `lyrics_fragment` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[vtuberProfileId]` on the table `LiveRecordingArchive` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PremiumStatus" AS ENUM ('Captain', 'Admiral', 'Governor');

-- AlterTable
ALTER TABLE "LiveRecordingArchive" ADD COLUMN     "vtuberProfileId" INTEGER;

-- AlterTable
ALTER TABLE "Song" RENAME COLUMN "created_on" TO "createdOn";
ALTER TABLE "Song" RENAME COLUMN "lyrics_fragment" TO "lyricsFragment";
ALTER TABLE "Song" ADD COLUMN     "updatedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "SongOccurrenceInLive" ADD COLUMN     "vtuberSongId" INTEGER;

-- DropTable
DROP TABLE "Feedback";

-- CreateTable
CREATE TABLE "VtuberSong" (
    "id" SERIAL NOT NULL,
    "songId" INTEGER NOT NULL,
    "vtuberProfileId" INTEGER NOT NULL,
    "bvid" TEXT,
    "pubdate" INTEGER,
    "audioUrl" TEXT,
    "numLikes" INTEGER NOT NULL DEFAULT 0,
    "numDislikes" INTEGER NOT NULL DEFAULT 0,
    "scStatusId" INTEGER,
    "remark" TEXT,
    "premiumStatus" "PremiumStatus",
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VtuberSong_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuperChat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SuperChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuperChatDefinition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SuperChatDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LiveRecordingArchive_vtuberProfileId_key" ON "LiveRecordingArchive"("vtuberProfileId");

-- AddForeignKey
ALTER TABLE "VtuberSong" ADD CONSTRAINT "VtuberSong_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VtuberSong" ADD CONSTRAINT "VtuberSong_vtuberProfileId_fkey" FOREIGN KEY ("vtuberProfileId") REFERENCES "VtuberProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VtuberSong" ADD CONSTRAINT "VtuberSong_scStatusId_fkey" FOREIGN KEY ("scStatusId") REFERENCES "SuperChat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveRecordingArchive" ADD CONSTRAINT "LiveRecordingArchive_vtuberProfileId_fkey" FOREIGN KEY ("vtuberProfileId") REFERENCES "VtuberProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongOccurrenceInLive" ADD CONSTRAINT "SongOccurrenceInLive_vtuberSongId_fkey" FOREIGN KEY ("vtuberSongId") REFERENCES "VtuberSong"("id") ON DELETE CASCADE ON UPDATE CASCADE;
