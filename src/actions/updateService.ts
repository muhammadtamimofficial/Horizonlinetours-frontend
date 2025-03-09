"use server";
import { Service } from "@/types/servicesType";
import { baseUrl } from "@/utils/baseUrl";

// Update service function
export const updateService = async (serviceId: string, data: Service) => {
  const res = await fetch(`${baseUrl}/services/${serviceId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return (await res).json();
};
