/*
  Warnings:

  - Made the column `vtuberProfileId` on table `LiveRecordingArchive` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LiveRecordingArchive" ALTER COLUMN "vtuberProfileId" SET NOT NULL;
