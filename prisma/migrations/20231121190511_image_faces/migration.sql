-- CreateTable
CREATE TABLE "Face" (
    "id" TEXT NOT NULL,
    "indexedFaceId" TEXT NOT NULL,
    "indexedImageId" TEXT NOT NULL,
    "imageKey" TEXT NOT NULL,
    "imageId" TEXT,

    CONSTRAINT "Face_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Face" ADD CONSTRAINT "Face_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
