/*
  Warnings:

  - A unique constraint covering the columns `[bvid]` on the table `VtuberProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roomId]` on the table `VtuberProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Theme" ADD COLUMN     "faviconImagePath" TEXT;

-- AlterTable
ALTER TABLE "VtuberProfile" ADD COLUMN     "bvid" TEXT,
ADD COLUMN     "roomId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "VtuberProfile_bvid_key" ON "VtuberProfile"("bvid");

-- CreateIndex
CREATE UNIQUE INDEX "VtuberProfile_roomId_key" ON "VtuberProfile"("roomId");
