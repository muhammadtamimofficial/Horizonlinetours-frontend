"use server";

import { GalleryItem } from "@/types/galleryItemType";
import { baseUrl } from "../baseUrl";

export const getGalleries = async () => {
  const res = await fetch(`${baseUrl}/galleries`);
  if (!res.ok) return null;
  const data: GalleryItem[] = await res.json();
  return data;
};
