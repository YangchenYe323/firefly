-- CreateIndex
CREATE INDEX CONCURRENTLY "LiveRecordingArchive_vtuberProfileId_pubdate_idx" ON "public"."LiveRecordingArchive"("vtuberProfileId", "pubdate" DESC);
