/*
  Warnings:

  - Added the required column `type` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('PNG', 'JPG');

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "type" "ImageType" NOT NULL;
