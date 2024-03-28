/*
  Warnings:

  - You are about to drop the column `userId` on the `userProfiles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "userProfiles" DROP CONSTRAINT "userProfiles_userId_fkey";

-- DropIndex
DROP INDEX "userProfiles_userId_key";

-- AlterTable
ALTER TABLE "userProfiles" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "userProfiles" ADD CONSTRAINT "userProfiles_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
