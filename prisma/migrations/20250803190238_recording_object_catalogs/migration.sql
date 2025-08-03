-- AlterTable
ALTER TABLE "LiveRecordingArchive" ADD COLUMN     "audioObjectKeys" TEXT[],
ADD COLUMN     "lastSongOccurrenceScan" TIMESTAMPTZ,
ADD COLUMN     "transcriptObjectKey" TEXT;
