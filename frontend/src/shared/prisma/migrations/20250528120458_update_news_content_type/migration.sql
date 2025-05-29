/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Source` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `News` MODIFY `content` MEDIUMTEXT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Category_name_key` ON `Category`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Source_name_key` ON `Source`(`name`);
