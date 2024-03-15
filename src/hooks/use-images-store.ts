import { type Image } from "@prisma/client";
import { create } from "zustand";

type Store = {
  images: Image[];
  updateImages: (images: Image[]) => void;
};

const initialData = {
  images: [],
};

export const useImagesStore = create<Store>((set) => ({
  ...initialData,
  updateImages: (images) => set({ images }),
}));
