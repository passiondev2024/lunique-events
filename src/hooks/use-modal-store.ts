import { create } from "zustand";
import { type Image } from "@prisma/client";
import { type RouterOutputs } from "@/trpc/shared";

export type ModalType =
  | "create-event"
  | "share-event"
  | "upload-event-images"
  | "delete-event-images"
  | "delete-event"
  | "cancel-subscription";

export type ModalData = {
  eventId?: string;
  images?: string[];
  galleryImages?: Image[];
  galleryId?: string;
  currentImage?: number;
  subscription?: RouterOutputs["billing"]["getSubscription"];
};

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (modal: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,

  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
