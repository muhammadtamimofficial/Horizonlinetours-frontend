"use client";
import React from "react";
import { baseUrl } from "@/utils/baseUrl";
import toast from "react-hot-toast";
import { Message } from "@/types/messageType";
import { useRouter } from "next/navigation";

interface MessagesSectionProps {
  messages: Message[];
}

const MessagesSection: React.FC<MessagesSectionProps> = ({ messages }) => {
  const router = useRouter();
  // Function to handle message deletion
  const handleDeleteMessage = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/messages/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete message");
      }

      const result = await response.json();
      toast.success(result.message || "Message deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("An error occurred while deleting the message");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-200 text-left">
                First Name
              </th>
              <th className="py-2 px-4 border border-gray-200 text-left">
                Last Name
              </th>
              <th className="py-2 px-4 border border-gray-200 text-left">
                Mobile No
              </th>
              <th className="py-2 px-4 border border-gray-200 text-left">
                Email
              </th>
              <th className="py-2 px-4 border border-gray-200 text-left">
                Message
              </th>
              <th className="py-2 px-4 border border-gray-200 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border border-gray-200 text-left">
                  {message.firstName}
                </td>
                <td className="py-2 px-4 border border-gray-200 text-left">
                  {message.lastName}
                </td>
                <td className="py-2 px-4 border border-gray-200 text-left">
                  {message.mobileNo}
                </td>
                <td className="py-2 px-4 border border-gray-200 text-left">
                  {message.email}
                </td>
                <td className="py-2 px-4 border border-gray-200 text-left">
                  {message.message}
                </td>
                <td className="py-2 px-4 border border-gray-200 text-left">
                  <button
                    onClick={() => handleDeleteMessage(message._id as string)}
                    className="p-2 bg-red-500 text-white rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessagesSection;
