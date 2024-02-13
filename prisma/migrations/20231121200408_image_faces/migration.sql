/*
  Warnings:

  - You are about to drop the column `imageId` on the `Face` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Face" DROP CONSTRAINT "Face_imageId_fkey";

-- AlterTable
ALTER TABLE "Face" DROP COLUMN "imageId",
ADD COLUMN     "eventId" TEXT;

-- AddForeignKey
ALTER TABLE "Face" ADD CONSTRAINT "Face_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
