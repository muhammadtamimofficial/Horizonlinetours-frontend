"use server";

import { AuthUser } from "@/types/authUserType";
import { baseUrl } from "../baseUrl";

export const registerUser = async (data: AuthUser) => {
  const res = await fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  return res.json();
};
