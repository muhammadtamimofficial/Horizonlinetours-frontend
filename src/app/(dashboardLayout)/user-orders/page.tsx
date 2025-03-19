import BookingsSection from "@/components/DashboardComponents/BookingsSection";
import { baseUrl } from "@/utils/baseUrl";
import React from "react";

const UserOrdersPage = async () => {
  const res = await fetch(`${baseUrl}/bookings`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const bookings = await res.json();

  return (
    <div>
      <BookingsSection bookings={bookings} />
    </div>
  );
};

export default UserOrdersPage;
