/*
  Warnings:

  - You are about to drop the column `user_id` on the `userProfiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `userProfiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `userProfiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "userProfiles" DROP CONSTRAINT "userProfiles_user_id_fkey";

-- DropIndex
DROP INDEX "userProfiles_user_id_key";

-- AlterTable
ALTER TABLE "userProfiles" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "userProfiles_userId_key" ON "userProfiles"("userId");

-- AddForeignKey
ALTER TABLE "userProfiles" ADD CONSTRAINT "userProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
