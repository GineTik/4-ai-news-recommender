-- AlterTable
ALTER TABLE `Category` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `iconId` INTEGER NULL,
    ADD COLUMN `label` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Icon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `source` ENUM('LUCIDE') NOT NULL DEFAULT 'LUCIDE',
    `lucideName` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_iconId_fkey` FOREIGN KEY (`iconId`) REFERENCES `Icon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
