-- AlterTable
ALTER TABLE `Trip`
ADD COLUMN `status` ENUM ('planning', 'completed') NOT NULL DEFAULT 'planning';

-- CreateTable
CREATE TABLE `TripImage` (
  `id` VARCHAR(191) NOT NULL,
  `image` JSON NULL,
  `trip` VARCHAR(191) NULL,
  INDEX `TripImage_trip_idx` (`trip`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER
SET
  utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TripImage` ADD CONSTRAINT `TripImage_trip_fkey` FOREIGN KEY (`trip`) REFERENCES `Trip` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
