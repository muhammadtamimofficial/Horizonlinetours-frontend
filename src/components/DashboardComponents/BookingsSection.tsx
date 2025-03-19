"use client";
import React from "react";
import { Booking } from "@/types/BookingType"; // Import the Booking type
import { baseUrl } from "@/utils/baseUrl";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface BookingTableProps {
  bookings: Booking[];
}

const BookingsSection: React.FC<BookingTableProps> = ({ bookings }) => {
  const router = useRouter();
  // changing booking status
  const handleAdminConfirmation = async (bookingId: string, status: string) => {
    console.log(bookingId, status);
    try {
      const response = await fetch(
        `${baseUrl}/bookings/update-status/${bookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      console.log(response);

      if (response.ok) {
        toast.success("Status Updated Successfully");
        router.refresh();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("An error occurred while updating the status");
    }
  };

  return (
    <div className="overflow-x-auto text-sm">
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border border-gray-200 text-left">
              Service Name
            </th>
            <th className="py-2 px-4 border border-gray-200 text-left">
              Customer Name
            </th>
            <th className="py-2 px-4 border border-gray-200 text-left">
              Customer Email
            </th>
            <th className="py-2 px-4 border border-gray-200 text-left">
              Phone
            </th>
            <th className="py-2 px-4 border border-gray-200 text-left">
              Country
            </th>
            <th className="py-2 px-4 border border-gray-200 text-left">
              State
            </th>
            <th className="py-2 px-4 border border-gray-200 text-left">City</th>
            <th className="py-2 px-4 border border-gray-200 text-left">
              Postal Code
            </th>
            <th className="py-2 px-4 border border-gray-200 text-left">
              Amount
            </th>
            <th className="py-2 px-4 border border-gray-200 text-left">
              Order Date
            </th>
            <th className="py-2 px-4 border border-gray-200 text-left">
              Transaction ID
            </th>
            <th className="py-2 px-4 border border-gray-200 text-left">
              Payment Status
            </th>
            <th className="py-2 px-4 border border-gray-200 text-left">
              Admin Confirmation
            </th>
            <th className="py-2 px-4 border border-gray-200 text-left">
              Change Status
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr
              key={booking.transaction_id}
              className={`${index % 2 === 0 ? "bg-gray-300" : "bg-white"}`}
            >
              <td className="py-2 px-4 border border-gray-200 text-left">
                {booking.service_name}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-left">
                {booking.first_name} {booking.last_name}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-left">
                {booking.email}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-left">
                {booking.phone}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-left">
                {booking.country}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-left">
                {booking.state}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-left">
                {booking.city}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-left">
                {booking.postal_code}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-left">
                {booking.amount}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-left">
                {(() => {
                  const date = new Date(booking.date);
                  const day = date.getDate();
                  const month = date.toLocaleString("default", {
                    month: "long",
                  }); // Full month name
                  const year = date.getFullYear();
                  const hours = String(date.getHours()).padStart(2, "0");
                  const minutes = String(date.getMinutes()).padStart(2, "0");
                  return `${day} ${month} ${year}, ${hours}:${minutes}`;
                })()}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-left">
                {booking.transaction_id}
              </td>
              <td className="py-2 px-4 border border-gray-200 text-left">
                <span className="bg-green-500 p-2"> {booking.status}</span>
              </td>
              <td className={`py-2 px-4 border border-gray-200 text-left`}>
                <span
                  className={`p-2 text-white ${
                    booking.admin_confirmation === "pending"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {booking.admin_confirmation}
                </span>
              </td>
              <td className="py-2 px-4 border border-gray-200 text-left">
                <button
                  onClick={() =>
                    handleAdminConfirmation(booking?._id as string, "confirmed")
                  }
                  className="p-2 bg-green-500 text-white rounded cursor-pointer"
                >
                  Confirm
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsSection;
