/*
  Warnings:

  - You are about to drop the column `photo` on the `flats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "flats" DROP COLUMN "photo",
ADD COLUMN     "photos" TEXT[];
