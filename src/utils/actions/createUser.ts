"use server";
import { User } from "@/types/userType";
import { baseUrl } from "@/utils/baseUrl";

export const createUser = async (data: User) => {
  const res = fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (await res).json();
};
