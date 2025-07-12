-- CreateTable
CREATE TABLE "vtuber_profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "defaultThemeId" INTEGER,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vtuber_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "theme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "bannerImagePath" TEXT NOT NULL,
    "avatarImagePath" TEXT NOT NULL,
    "backgroundImagePath" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "vtuberProfileId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vtuber_external_link" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "icon" TEXT,
    "href" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "vtuberProfileId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vtuber_external_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vtuber_profile_defaultThemeId_key" ON "vtuber_profile"("defaultThemeId");

-- AddForeignKey
ALTER TABLE "vtuber_profile" ADD CONSTRAINT "vtuber_profile_defaultThemeId_fkey" FOREIGN KEY ("defaultThemeId") REFERENCES "theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theme" ADD CONSTRAINT "theme_vtuberProfileId_fkey" FOREIGN KEY ("vtuberProfileId") REFERENCES "vtuber_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vtuber_external_link" ADD CONSTRAINT "vtuber_external_link_vtuberProfileId_fkey" FOREIGN KEY ("vtuberProfileId") REFERENCES "vtuber_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
