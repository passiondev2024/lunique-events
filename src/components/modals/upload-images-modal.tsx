"use client";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { UploadCloudIcon } from "lucide-react";

export const UploadImagesModal = () => {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "upload-event-images";

  const onDrop = useCallback((files: Blob[]) => {
    console.log(files);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload photos</DialogTitle>
          <DialogDescription>Upload event photos here</DialogDescription>
        </DialogHeader>
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center gap-5 rounded-lg border border-dashed py-10 text-center"
        >
          <input {...getInputProps()} />
          <div className="h-fit w-fit rounded-full bg-primary/40 p-5">
            <UploadCloudIcon className="h-16 w-16 text-primary-foreground" />
          </div>
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <>
              <p>
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </p>
              <p className="text-sm text-zinc-500 ">
                Only *.jpg and *.png images will be accepted. <br /> Files over
                10MB are ignored.
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// import React, { useCallback } from "react";
// import { useDropzone } from "react-dropzone";

// function MyDropzone() {
//   const onDrop = useCallback((acceptedFiles) => {
//     // Do something with the files
//   }, []);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drop the files here ...</p>
//       ) : (
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       )}
//     </div>
//   );
// }
