import { type Image } from "@prisma/client";
import { create } from "zustand";

type GalleryData = {
  images: Image[];
  currentImage: number;
  selected: Image[];
};

type GalleryModalStore = GalleryData & {
  isOpen: boolean;
  onOpen: (imageIdx: number) => void;
  onClose: () => void;
  updateSelected: (selected: GalleryData["selected"]) => void;
  updateImages: (images: Image[]) => void;
  selectAll: () => void;
  deselectAll: () => void;
  toggleSelected: (image: Image) => void;
};

const initialData: GalleryData = {
  images: [],
  currentImage: 0,
  selected: [],
};

export const useGalleryModal = create<GalleryModalStore>((set, get) => ({
  ...initialData,

  isOpen: false,

  onOpen: (imageIdx) => set({ currentImage: imageIdx, isOpen: true }),
  onClose: () => set({ isOpen: false }),

  updateSelected: (selected) => set({ selected }),
  updateImages: (images) => set({ images }),

  selectAll: () => set({ selected: get().images }),
  deselectAll: () => set({ selected: [] }),

  toggleSelected: (image) =>
    set({
      selected: get().selected.find((item) => item.id === image.id)
        ? get().selected.filter((item) => item.id !== image.id)
        : [...get().selected, image],
    }),
}));
