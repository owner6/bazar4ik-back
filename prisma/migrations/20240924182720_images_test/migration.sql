/*
  Warnings:

  - Made the column `images` on table `Add` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Add" ALTER COLUMN "images" SET NOT NULL;
