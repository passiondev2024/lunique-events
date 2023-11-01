"use client";

import { useEffect, useState } from "react";
import { CreateEventModal } from "../modals/create-event-modal";
import { ShareEventModal } from "../modals/share-event-modal";
import { UploadImagesModal } from "../modals/upload-images-modal";
import { DeleteEventImagesModal } from "../modals/delete-images-modal";
import { DeleteEventModal } from "../modals/delete-event-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateEventModal />
      <ShareEventModal />
      <UploadImagesModal />
      <DeleteEventModal />
      <DeleteEventImagesModal />
    </>
  );
};
