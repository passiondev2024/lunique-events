import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToMB = (bytes: number) => {
  const mbs = bytes / 1024 ** 2;
  return Math.round(mbs * 100) / 100;
};
