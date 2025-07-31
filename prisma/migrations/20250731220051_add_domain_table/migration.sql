/*
  Warnings:

  - You are about to drop the `Footer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Footer";

-- CreateTable
CREATE TABLE "Domain" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icpLicenseNumber" TEXT,
    "publicSecurityFilingNumber" TEXT,
    "vtuberProfileId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Domain_name_key" ON "Domain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Domain_vtuberProfileId_key" ON "Domain"("vtuberProfileId");

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_vtuberProfileId_fkey" FOREIGN KEY ("vtuberProfileId") REFERENCES "VtuberProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
