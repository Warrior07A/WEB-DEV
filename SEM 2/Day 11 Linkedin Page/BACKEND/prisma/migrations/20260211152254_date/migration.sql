/*
  Warnings:

  - Changed the type of `CreatedAt` on the `Posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "CreatedAt",
ADD COLUMN     "CreatedAt" INTEGER NOT NULL;
