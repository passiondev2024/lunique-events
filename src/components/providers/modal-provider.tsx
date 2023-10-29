"use client";

import { useEffect, useState } from "react";
import { CreateEventModal } from "../modals/create-event-modal";

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
    </>
  );
};
