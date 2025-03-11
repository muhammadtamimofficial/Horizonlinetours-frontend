"use server";
import { Blog } from "@/types/BlogType";
import { baseUrl } from "@/utils/baseUrl";

export const createBlog = async (data: Blog) => {
  const res = fetch(`${baseUrl}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (await res).json();
};
