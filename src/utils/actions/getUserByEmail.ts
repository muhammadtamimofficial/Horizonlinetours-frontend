"use server";

import { baseUrl } from "../baseUrl";

export const getUserByEmail = async (email: string) => {
  const res = await fetch(`${baseUrl}/users/${email}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data;
};
