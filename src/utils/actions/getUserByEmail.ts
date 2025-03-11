"use server";

import { baseUrl } from "@/utils/baseUrl";

export const getUserByEmail = async (email: string | undefined) => {
  const res = await fetch(`${baseUrl}/users/${email}`);
  return res.json();
};
