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
      throw new Error("Failed to fetch services");
    }

    const services: Service[] = await res.json();

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
