"use server";

import { Message } from "@/types/messageType";
import { baseUrl } from "@/utils/baseUrl";

export const createMessage = async (data: Message) => {
  const res = fetch(`${baseUrl}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (await res).json();
};
