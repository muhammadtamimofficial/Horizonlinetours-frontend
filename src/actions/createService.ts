"use server";
import { Service } from "@/types/servicesType";
import { baseUrl } from "@/utils/baseUrl";

export const createService = async (data: Service) => {
  const res = fetch(`${baseUrl}/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (await res).json();
};
