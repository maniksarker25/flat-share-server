/*
  Warnings:

  - You are about to drop the column `availability` on the `flats` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `flats` table. All the data in the column will be lost.
  - You are about to drop the column `rent` on the `flats` table. All the data in the column will be lost.
  - You are about to drop the column `utilitiesDescription` on the `flats` table. All the data in the column will be lost.
  - Added the required column `amenities` to the `flats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detailedDescription` to the `flats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `flats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentAmount` to the `flats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flats" DROP COLUMN "availability",
DROP COLUMN "description",
DROP COLUMN "rent",
DROP COLUMN "utilitiesDescription",
ADD COLUMN     "amenities" TEXT NOT NULL,
ADD COLUMN     "detailedDescription" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "rentAmount" INTEGER NOT NULL;
