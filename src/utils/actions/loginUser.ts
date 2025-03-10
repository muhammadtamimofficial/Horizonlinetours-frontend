"use server";

import { baseUrl } from "../baseUrl";
import { LoginUser } from "@/app/login/page";

export const loginUser = async (data: LoginUser) => {
  const res = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  return res.json();
};
