"use server";

import { baseUrl } from "@/utils/baseUrl";

export const deleteService = async (id: string) => {
  const res = await fetch(`${baseUrl}/services/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
