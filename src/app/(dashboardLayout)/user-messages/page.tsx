import MessagesSection from "@/components/DashboardComponents/MessagesSection";
import { baseUrl } from "@/utils/baseUrl";
import React from "react";

const UserMessagesPage = async () => {
  const res = await fetch(`${baseUrl}/messages`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const messages = await res.json();

  return (
    <div>
      <MessagesSection messages={messages} />
    </div>
  );
};

export default UserMessagesPage;
