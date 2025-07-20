/*
  Warnings:

  - Made the column `date` on table `LiveRecordingArchive` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LiveRecordingArchive" ALTER COLUMN "date" SET NOT NULL;
