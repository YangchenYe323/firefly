-- DropForeignKey
ALTER TABLE "SongOccurrenceInLive" DROP CONSTRAINT "SongOccurrenceInLive_liveRecordingArchiveId_fkey";

-- DropForeignKey
ALTER TABLE "SongOccurrenceInLive" DROP CONSTRAINT "SongOccurrenceInLive_songId_fkey";

-- AddForeignKey
ALTER TABLE "SongOccurrenceInLive" ADD CONSTRAINT "SongOccurrenceInLive_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongOccurrenceInLive" ADD CONSTRAINT "SongOccurrenceInLive_liveRecordingArchiveId_fkey" FOREIGN KEY ("liveRecordingArchiveId") REFERENCES "LiveRecordingArchive"("id") ON DELETE CASCADE ON UPDATE CASCADE;
