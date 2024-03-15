"use client";

import { type Key, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { type Image } from "@prisma/client";
import { Share1Icon } from "@radix-ui/react-icons";
import axios from "axios";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import JSZip from "jszip";
import {
  DownloadIcon,
  Loader2Icon,
  MapPinIcon,
  // ShareIcon,
  SparklesIcon,
  TrashIcon,
  UploadCloudIcon,
} from "lucide-react";

import { AvatarIcon } from "@/components/icons/avatar-icon";
import { CalendarIcon } from "@/components/icons/calendar-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useGalleryModal } from "@/hooks/use-gallery-modal-store";
import { useImagesStore } from "@/hooks/use-images-store";
import { getSelfieImagePath } from "@/lib/get-path";
import { api } from "@/trpc/react";
import { type EventWithOwner } from "@/types";

interface GallerySidebarProps {
  event: EventWithOwner;
  images: Image[];
}

export const GallerySidebar = ({ event, images }: GallerySidebarProps) => (
  <div className="space-y-3">
    <DetailsWidget event={event} />
    <ImageUploadWidget event={event} images={images} />
    {/* TODO: Implement action widget */}
    {/* <ActionsWidget /> */}
  </div>
);

const DetailsWidget = ({ event }: { event: EventWithOwner }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">{event.name}</CardTitle>
      {event.owner && (
        <CardDescription>Hosted by {event.owner.name}</CardDescription>
      )}
    </CardHeader>
    <CardContent className="space-y-5">
      <div className="flex items-center gap-3">
        <CalendarIcon date={event.date} />
        <div className="flex flex-col text-xl font-medium">
          <span>{format(event.date, "eeee, d MMMM")}</span>
          <span className="text-sm text-muted-foreground">
            {event.date.getFullYear()}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-md border">
          <MapPinIcon />
        </div>
        <div>
          <p className="text-xl font-medium">{event.location}</p>
          <span className="text-sm text-muted-foreground">
            {event.location}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ImageUploadWidget = ({
  event,
  images,
}: {
  event: EventWithOwner;
  images: Image[];
}) => {
  const [searching, setSearching] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const { updateImages: updateFoundImages, images: foundImages } =
    useImagesStore();
  const { updateImages: updateGalleryImages, updateSelected } =
    useGalleryModal();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    maxSize: 10 * 1000 * 1000,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
    },
    onDropAccepted: (files) => setFile(files[0] ?? null),
  });

  const { mutateAsync: fetchPresignedUrl } =
    api.s3.getPresignedUrl.useMutation();

  const { mutate: findImages } = api.event.findImages.useMutation();

  const { toast } = useToast();

  const handleFindImages = async () => {
    if (!file) return;

    setSearching(true);

    const key = getSelfieImagePath(event.id, file.name);
    const presignedUrl = await fetchPresignedUrl({
      key,
    });

    await axios.put(presignedUrl, file.slice(), {
      headers: { "Content-Type": file.type },
    });

    findImages(
      { eventId: event.id, imageKey: key },
      {
        onSuccess: (images) => {
          if (images.length > 0) {
            updateFoundImages(images);
          } else {
            toast({
              title: "We can not find you. :)",
            });
          }
        },
        onError: (err) => {
          if (err.data?.code === "TOO_MANY_REQUESTS") {
            toast({
              variant: "destructive",
              title: "Slow down man. :)",
              description:
                "We are still in development, so you can create only one request per two minutes",
            });
          } else {
            toast({
              title: "We can not find you.",
              description: "Something went wront. Please try again.",
            });
          }
        },
      },
    );

    setSearching(false);
  };

  const handleRemoveImage = useCallback(() => {
    setFile(null);
    updateFoundImages([]);
    updateSelected([]);
    updateGalleryImages(images);
  }, [images, updateGalleryImages, updateFoundImages, updateSelected]);

  const handleDownloadMyImages = useCallback(async () => {
    const zip = new JSZip();

    try {
      const downloadPromises = foundImages.map(async (img) => {
        const response = await fetch(img.url);
        const blob = await response.blob();
        const filename = img.url.substring(img.url.lastIndexOf("/") + 1);
        zip.file(filename, blob);
      });

      await Promise.all(downloadPromises);

      const zipBlob = await zip.generateAsync({ type: "blob" });

      const zipFileUrl = window.URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = zipFileUrl;
      link.setAttribute("download", `${event.name.toLowerCase()}.zip`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  }, [foundImages, event]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Upload Your Image</CardTitle>
        <CardDescription>
          We utilize facial recognition to find all your images
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        {!file && (
          <AnimateFade motionKey="upload" isVisible={!file}>
            <div
              className="flex h-[220px] w-full flex-col justify-evenly rounded-lg"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!isDragActive && !file && (
                <div className="flex cursor-pointer flex-col items-center gap-3">
                  <div className="flex size-32 items-center justify-center rounded-full border-4 border-muted-foreground">
                    <AvatarIcon className="size-24 fill-muted-foreground" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-center text-sm text-muted-foreground">
                      Drag &apos;n&apos; drop some image, or click to select
                      image
                    </p>
                    <p className="text-center text-xs text-muted-foreground">
                      Only *.jpg and *.png images will be accepted. <br /> Files
                      over 10MB are ignored.
                    </p>
                  </div>
                </div>
              )}
              {isDragActive && (
                <div className="flex h-[280px] w-full items-center justify-center border-muted-foreground">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <UploadCloudIcon className="size-16" />
                    <p className="text-xs font-bold uppercase">
                      Drop your selfie image here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </AnimateFade>
        )}
        {file && (
          <AnimateFade motionKey="selfie" isVisible={!!file}>
            <div className=" flex h-[220px] w-full items-center justify-between md:justify-evenly">
              <div className="flex flex-col items-center justify-center gap-3">
                {/* eslint-disable-next-line */}
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="size-32 rounded-full object-cover"
                />
                <Button
                  disabled={!file}
                  className="w-full"
                  size="sm"
                  variant="destructive"
                  onClick={handleRemoveImage}
                >
                  <TrashIcon className="mr-1.5 size-4" />
                  Remove
                </Button>
              </div>
              <div className="flex w-44 flex-col gap-3">
                <Button
                  disabled={!file || !!foundImages.length || searching}
                  size="sm"
                  className="w-full"
                  onClick={handleFindImages}
                >
                  <SparklesIcon className="mr-1.5 size-4" />
                  Find My Images
                  {searching && (
                    <Loader2Icon className="ml-1.5 size-4 animate-spin" />
                  )}
                </Button>
                <Button
                  disabled={!foundImages.length}
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={handleDownloadMyImages}
                >
                  <DownloadIcon className="mr-1.5 size-4" />
                  Download My Images
                </Button>
                <Button
                  disabled={true}
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => alert(`File: ${file?.name}`)}
                >
                  <Share1Icon className="mr-1.5 size-4" />
                  Share My Images
                </Button>
              </div>
            </div>
          </AnimateFade>
        )}
      </CardContent>
    </Card>
  );
};

// const ActionsWidget = () => (
//   <Card className="flex justify-evenly p-3">
//     <Button size="icon" variant="secondary" className="rounded-full ">
//       <DownloadIcon className="h-4 w-4" />
//     </Button>
//     <Button size="icon" variant="secondary" className="rounded-full">
//       <ShareIcon className="h-4 w-4" />
//     </Button>
//     <Button size="icon" variant="secondary" className="rounded-full">
//       <DownloadIcon className="h-4 w-4" />
//     </Button>
//     <Button size="icon" variant="secondary" className="rounded-full">
//       <ShareIcon className="h-4 w-4" />
//     </Button>
//     <Button size="icon" variant="secondary" className="rounded-full">
//       <DownloadIcon className="h-4 w-4" />
//     </Button>
//     <Button size="icon" variant="secondary" className="rounded-full">
//       <ShareIcon className="h-4 w-4" />
//     </Button>
//   </Card>
// );

const AnimateFade = ({
  children,
  isVisible,
  initial = true,
  motionKey,
}: {
  children: React.ReactNode;
  isVisible: boolean;
  initial?: boolean;
  motionKey: Key;
}) => (
  <AnimatePresence mode="wait" initial={initial}>
    {isVisible && (
      <motion.div
        key={motionKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
        className="w-full"
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);
