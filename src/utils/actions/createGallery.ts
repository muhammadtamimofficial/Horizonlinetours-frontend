"use server";

import { GalleryItem } from "@/types/galleryItemType";
import { baseUrl } from "@/utils/baseUrl";

export const createGallery = async (data: GalleryItem) => {
  const res = fetch(`${baseUrl}/galleries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (await res).json();
};
