"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import axios from "axios";
import { DownloadIcon, ImagePlusIcon, XIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getThumbnailImagePath } from "@/lib/get-path";
import { getImageUrl } from "@/lib/get-url";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

interface ImageUploadProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export const ImageUpload = ({ onChange }: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const { mutate: fetchPresignedUrl } = api.s3.getPresignedUrl.useMutation();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    maxSize: 10 * 1000 * 1000,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
    },
    onDropAccepted: (files) => {
      if (!files[0]) return;

      setFile(files[0]);

      const key = getThumbnailImagePath(files[0].name);
      fetchPresignedUrl(
        {
          key,
        },
        {
          onSuccess: (presignedUrl) => {
            axios
              .put(presignedUrl, files[0]!.slice(), {
                headers: { "Content-Type": files[0]!.type },
              })
              .then(() => onChange(getImageUrl(key)))
              .catch((err) => {
                console.log(err);
                toast({
                  variant: "destructive",
                  title: "Failed to upload image",
                  description: "Something went wrong. Please try again.",
                });
              });
          },
          onError: () => {
            onChange(null);
            setFile(null);
            toast({
              variant: "destructive",
              title: "Failed to upload image",
              description: "Something went wrong. Please try again.",
            });
          },
        },
      );
    },
  });

  return (
    <>
      {file && (
        <div className="relative">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={URL.createObjectURL(file)}
              fill
              alt=""
              className="w-full rounded-md border border-border object-cover"
            />
          </AspectRatio>
          {file && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => setFile(null)}
              className="absolute bottom-3 right-3 rounded-full"
            >
              <XIcon className="size-4 text-destructive-foreground" />
            </Button>
          )}
        </div>
      )}
      {!file && (
        <div className="relative" {...getRootProps()}>
          <input {...getInputProps()} />
          <AspectRatio ratio={1 / 1} className="">
            <div
              className={cn(
                "flex h-full w-full items-center justify-center rounded-md border border-border bg-muted object-cover",
                isDragActive && "border-muted-foreground/50",
              )}
            >
              <Button
                type="button"
                size="icon"
                className="size-20 rounded-full bg-muted-foreground/10 hover:bg-muted-foreground/20"
              >
                {!isDragActive && (
                  <ImagePlusIcon className="size-8 text-muted-foreground" />
                )}
                {isDragActive && (
                  <DownloadIcon className="size-8 text-muted-foreground" />
                )}
              </Button>
            </div>
          </AspectRatio>
        </div>
      )}
    </>
  );
};
