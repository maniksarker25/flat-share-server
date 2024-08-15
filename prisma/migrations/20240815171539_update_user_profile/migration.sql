/*
  Warnings:

  - Added the required column `education` to the `userProfiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `userProfiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `userProfiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userProfiles" ADD COLUMN     "education" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "userProfiles" ADD CONSTRAINT "userProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
