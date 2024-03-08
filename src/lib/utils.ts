import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToMB = (bytes: number) => {
  const mbs = bytes / 1024 ** 2;
  return Math.round(mbs * 100) / 100;
};

export const formatDate = (date: string) =>
  format(new Date(date), "do MMMM, yyy");
