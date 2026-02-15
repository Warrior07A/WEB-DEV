/*
  Warnings:

  - You are about to alter the column `CreatedAt` on the `Posts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "CreatedAt" SET DATA TYPE INTEGER;
