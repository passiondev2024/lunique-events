"use client";

import { useEffect, useState } from "react";

import { CancelSubscriptionModal } from "../modals/cancel-subscription-modal";
import { CheckGuestsModal } from "../modals/check-guests-modal";
import { ChooseThumbnailModal } from "../modals/choose-event-thumbnail";
import { CreateEventModal } from "../modals/create-event-modal";
import { DeleteEventModal } from "../modals/delete-event-modal";
import { DeleteEventImagesModal } from "../modals/delete-images-modal";
import { GalleryModal } from "../modals/gallery-modal";
import { InviteGuestsModal } from "../modals/invite-guests-modal";
import { ShareEventModal } from "../modals/share-event-modal";
import { ShowGuestListModal } from "../modals/show-guest-list-modal";
import { UploadImagesModal } from "../modals/upload-images-modal";

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
      <GalleryModal />
      <CancelSubscriptionModal />
      <ChooseThumbnailModal />
      <ShowGuestListModal />
      <CheckGuestsModal />
      <InviteGuestsModal />
    </>
  );
};
