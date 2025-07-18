/*
  Warnings:

  - You are about to drop the column `bvid` on the `VtuberProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mid]` on the table `VtuberProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "VtuberProfile_bvid_key";

-- AlterTable
ALTER TABLE "VtuberProfile" DROP COLUMN "bvid",
ADD COLUMN     "mid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "VtuberProfile_mid_key" ON "VtuberProfile"("mid");
