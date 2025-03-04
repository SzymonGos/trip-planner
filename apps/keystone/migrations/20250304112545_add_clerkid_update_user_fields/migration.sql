/*
Warnings:

- You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
- A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User`
DROP COLUMN `name`,
ADD COLUMN `clerkId` VARCHAR(191) NOT NULL DEFAULT '',
ADD COLUMN `email` VARCHAR(191) NOT NULL DEFAULT '',
ADD COLUMN `username` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `User_clerkId_key` ON `User` (`clerkId`);
