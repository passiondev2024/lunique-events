-- DropForeignKey
ALTER TABLE "Face" DROP CONSTRAINT "Face_eventId_fkey";

-- AddForeignKey
ALTER TABLE "Face" ADD CONSTRAINT "Face_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
