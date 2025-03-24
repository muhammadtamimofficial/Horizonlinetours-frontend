import BookingsSection from "@/components/DashboardComponents/BookingsSection";
import { baseUrl } from "@/utils/baseUrl";

export const dynamic = "force-dynamic"; // Force dynamic rendering

const UserOrdersPage = async () => {
  try {
    const res = await fetch(`${baseUrl}/bookings`);

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const bookings = await res.json();

    return (
      <div>
        <BookingsSection bookings={bookings} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return <p className="text-red-500">Failed to load bookings.</p>;
  }
};

export default UserOrdersPage;
