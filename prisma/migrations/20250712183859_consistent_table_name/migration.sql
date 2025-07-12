/*
  Warnings:

  - You are about to drop the `theme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vtuber_external_link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vtuber_profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "theme" DROP CONSTRAINT "theme_vtuberProfileId_fkey";

-- DropForeignKey
ALTER TABLE "vtuber_external_link" DROP CONSTRAINT "vtuber_external_link_vtuberProfileId_fkey";

-- DropForeignKey
ALTER TABLE "vtuber_profile" DROP CONSTRAINT "vtuber_profile_defaultThemeId_fkey";

-- DropTable
DROP TABLE "theme";

-- DropTable
DROP TABLE "vtuber_external_link";

-- DropTable
DROP TABLE "vtuber_profile";

-- CreateTable
CREATE TABLE "VtuberProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "defaultThemeId" INTEGER,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VtuberProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "avatarImagePath" TEXT NOT NULL,
    "backgroundImagePath" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "vtuberProfileId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VtuberExternalLink" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "icon" TEXT,
    "href" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "vtuberProfileId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VtuberExternalLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VtuberProfile_defaultThemeId_key" ON "VtuberProfile"("defaultThemeId");

-- AddForeignKey
ALTER TABLE "VtuberProfile" ADD CONSTRAINT "VtuberProfile_defaultThemeId_fkey" FOREIGN KEY ("defaultThemeId") REFERENCES "Theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_vtuberProfileId_fkey" FOREIGN KEY ("vtuberProfileId") REFERENCES "VtuberProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VtuberExternalLink" ADD CONSTRAINT "VtuberExternalLink_vtuberProfileId_fkey" FOREIGN KEY ("vtuberProfileId") REFERENCES "VtuberProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
