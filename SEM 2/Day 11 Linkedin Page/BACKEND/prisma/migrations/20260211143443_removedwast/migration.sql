/*
  Warnings:

  - You are about to drop the column `owner_desc` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `owner_name` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `userpic` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "owner_desc",
DROP COLUMN "owner_name",
DROP COLUMN "userpic";
