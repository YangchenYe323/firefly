/*
  Warnings:

  - The primary key for the `SongOccurrenceInLive` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[songId]` on the table `VtuberSong` will be added. If there are existing duplicate values, this will fail.
  - Made the column `vtuberSongId` on table `SongOccurrenceInLive` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SongOccurrenceInLive" DROP CONSTRAINT "SongOccurrenceInLive_pkey",
ALTER COLUMN "vtuberSongId" SET NOT NULL,
ADD CONSTRAINT "SongOccurrenceInLive_pkey" PRIMARY KEY ("vtuberSongId", "liveRecordingArchiveId");

-- CreateIndex
CREATE UNIQUE INDEX "VtuberSong_songId_key" ON "VtuberSong"("songId");
