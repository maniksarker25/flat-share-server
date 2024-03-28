/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `userProfiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `userProfiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "userProfiles" DROP CONSTRAINT "userProfiles_id_fkey";

-- AlterTable
ALTER TABLE "userProfiles" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "userProfiles_user_id_key" ON "userProfiles"("user_id");

-- AddForeignKey
ALTER TABLE "userProfiles" ADD CONSTRAINT "userProfiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
