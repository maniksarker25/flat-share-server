/*
  Warnings:

  - Added the required column `profileImage` to the `userProfiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userProfiles" ADD COLUMN     "profileImage" TEXT NOT NULL;
