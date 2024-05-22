/*
  Warnings:

  - You are about to drop the column `advanceAmount` on the `flats` table. All the data in the column will be lost.
  - Added the required column `advancedAmount` to the `flats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flats" DROP COLUMN "advanceAmount",
ADD COLUMN     "advancedAmount" INTEGER NOT NULL;
