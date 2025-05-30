/*
  Warnings:

  - You are about to drop the column `iconId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `Icon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_iconId_fkey`;

-- DropIndex
DROP INDEX `Category_iconId_fkey` ON `Category`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `iconId`;

-- DropTable
DROP TABLE `Icon`;
