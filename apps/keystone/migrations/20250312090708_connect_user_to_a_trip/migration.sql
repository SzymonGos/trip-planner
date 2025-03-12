-- AlterTable
ALTER TABLE `Trip`
ADD COLUMN `creator` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Trip_creator_idx` ON `Trip` (`creator`);

-- AddForeignKey
ALTER TABLE `Trip` ADD CONSTRAINT `Trip_creator_fkey` FOREIGN KEY (`creator`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
