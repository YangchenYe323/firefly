/*
  Warnings:

  - Made the column `backgroundImagePath` on table `Theme` required. This step will fail if there are existing NULL values in that column.
  - Made the column `faviconImagePath` on table `Theme` required. This step will fail if there are existing NULL values in that column.
  - Made the column `metaTitle` on table `VtuberProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `metaDescription` on table `VtuberProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roomId` on table `VtuberProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mid` on table `VtuberProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Theme" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "backgroundImagePath" SET NOT NULL,
ALTER COLUMN "faviconImagePath" SET NOT NULL;

-- AlterTable
ALTER TABLE "VtuberProfile" ALTER COLUMN "metaTitle" SET NOT NULL,
ALTER COLUMN "metaDescription" SET NOT NULL,
ALTER COLUMN "roomId" SET NOT NULL,
ALTER COLUMN "mid" SET NOT NULL;
