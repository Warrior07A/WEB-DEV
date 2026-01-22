/*
  Warnings:

  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('customer', 'owner');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'customer';
