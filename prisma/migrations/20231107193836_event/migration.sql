-- DropForeignKey
ALTER TABLE "EventSettings" DROP CONSTRAINT "EventSettings_eventId_fkey";

-- AddForeignKey
ALTER TABLE "EventSettings" ADD CONSTRAINT "EventSettings_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
