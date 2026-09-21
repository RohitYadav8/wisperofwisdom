-- CreateTable
CREATE TABLE `journal_claims` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `challenge` TEXT NOT NULL,
    `goals` TEXT NOT NULL,
    `termsAccepted` BOOLEAN NOT NULL DEFAULT false,
    `marketingConsent` BOOLEAN NOT NULL DEFAULT false,
    `status` VARCHAR(191) NOT NULL DEFAULT 'NEW',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `journal_claims_email_idx`(`email`),
    INDEX `journal_claims_status_idx`(`status`),
    INDEX `journal_claims_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
