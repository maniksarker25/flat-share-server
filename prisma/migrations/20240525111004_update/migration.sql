/*
  Warnings:

  - Added the required column `name` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profession` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "profession" TEXT NOT NULL;
