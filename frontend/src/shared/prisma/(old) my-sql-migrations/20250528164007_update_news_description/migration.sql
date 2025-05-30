-- AlterTable
ALTER TABLE `Category` ADD COLUMN `lucideIconName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `News` MODIFY `description` MEDIUMTEXT NULL;
