import AllServicesClientComponent from "@/components/DashboardComponents/AllServicesClientComponent";
import { Service } from "@/types/servicesType";
import { baseUrl } from "@/utils/baseUrl";

export const dynamic = "force-dynamic"; // Force dynamic rendering

const AllServicesPage = async () => {
  try {
    const res = await fetch(`${baseUrl}/services`, {
      cache: "no-store", // Fetch fresh data on every request
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch services: ${res.statusText}`);
    }

    const textResponse = await res.text(); // Get the raw response as text

    let services: Service[] = [];
    try {
      services = JSON.parse(textResponse); // Parse the text as JSON
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      throw new Error("Invalid JSON response from the server");
    }

    if (!services || services.length === 0) {
      return <p className="text-gray-500">No services found.</p>;
    }

    return (
      <div>
        <div className="mt-4">
          <AllServicesClientComponent services={services} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching services:", error);
    return <p className="text-red-500">Failed to load services.</p>;
  }
};

export default AllServicesPage;
