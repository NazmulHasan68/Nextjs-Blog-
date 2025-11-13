import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '') // remove all non-word characters
    .replace(/\s+/g, '-')    // replace spaces with hyphens
    .trim();                 // remove any extra hyphens/spaces
}
