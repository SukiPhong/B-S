import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const generalDefaultAvatar = (name) =>
  `https://ui-avatars.com/api/?background=random&color=random&name=${name}&rounded=true&bole=true`