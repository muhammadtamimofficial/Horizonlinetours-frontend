import MessagesSection from "@/components/DashboardComponents/MessagesSection";
import { Message } from "@/types/messageType";
import { baseUrl } from "@/utils/baseUrl";

export const dynamic = "force-dynamic"; // Force dynamic rendering

const AllServicesPage = async () => {
  try {
    const res = await fetch(`${baseUrl}/messages`, {
      cache: "no-store", // Fetch fresh data on every request
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Messages");
    }

    const messages: Message[] = await res.json();

    return (
      <div>
        <div className="mt-4">
          <MessagesSection messages={messages} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching services:", error);
    return <p className="text-red-500">Failed to load services.</p>;
  }
};

export default AllServicesPage;
