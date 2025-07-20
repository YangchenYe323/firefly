/*
  Warnings:

  - You are about to drop the column `extra` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `remark` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Song` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "extra",
DROP COLUMN "remark",
DROP COLUMN "url";
