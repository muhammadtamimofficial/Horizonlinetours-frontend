"use client";
import { Message } from "@/types/messageType";
import { createMessage } from "@/utils/actions/createMessage";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ContactForm: React.FC = () => {
  // State to manage form data
  const [formData, setFormData] = useState<Message>({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createMessage(formData);
      if (response?.acknowledged === true) {
        toast.success("Message Sent Success");
        setFormData({
          firstName: "",
          lastName: "",
          mobileNo: "",
          email: "",
          message: "",
        });
      } else {
        toast.error("Failed to Send message , Try again");
      }
      console.log(response);
    } catch (error) {
      toast.error("An error occurred while creating the Message");
      console.error(error);
    }
  };

  return (
    <div className="mx-auto rounded-lg">
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="flex gap-2">
          <div className="mb-4 w-full">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4 w-full">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Mobile No */}
        <div className="flex gap-2">
          <div className="mb-4 w-full">
            <label
              htmlFor="mobileNo"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile No *
            </label>
            <input
              type="tel"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4 w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email ID *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Message */}
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
