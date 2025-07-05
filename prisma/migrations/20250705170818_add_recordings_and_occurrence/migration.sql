-- CreateTable
CREATE TABLE "LiveRecordingArchive" (
    "id" SERIAL NOT NULL,
    "bvid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pubdate" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "cover" TEXT NOT NULL,

    CONSTRAINT "LiveRecordingArchive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongOccurrenceInLive" (
    "songId" INTEGER NOT NULL,
    "liveRecordingArchiveId" INTEGER NOT NULL,
    "start" INTEGER NOT NULL,
    "page" INTEGER NOT NULL,

    CONSTRAINT "SongOccurrenceInLive_pkey" PRIMARY KEY ("songId","liveRecordingArchiveId")
);

-- CreateIndex
CREATE UNIQUE INDEX "LiveRecordingArchive_bvid_key" ON "LiveRecordingArchive"("bvid");

-- CreateIndex
CREATE INDEX "LiveRecordingArchive_bvid_pubdate_idx" ON "LiveRecordingArchive"("bvid", "pubdate" DESC);

-- AddForeignKey
ALTER TABLE "SongOccurrenceInLive" ADD CONSTRAINT "SongOccurrenceInLive_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongOccurrenceInLive" ADD CONSTRAINT "SongOccurrenceInLive_liveRecordingArchiveId_fkey" FOREIGN KEY ("liveRecordingArchiveId") REFERENCES "LiveRecordingArchive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
