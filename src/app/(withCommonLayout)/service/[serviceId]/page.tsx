import ServiceDetailsCard from "@/components/cards/ServiceDetailsCard";
import PaymentSection from "@/components/payment/PaymentSection";
import SpaceAfterNavbar from "@/components/shared/SpaceAfterNavbar";
import { baseUrl } from "@/utils/baseUrl";
import React from "react";

interface PageProps {
  params: Promise<{ serviceId: string }>;
}

const ServiceDetailsPage = async ({ params }: PageProps) => {
  const { serviceId } = await params;

  try {
    const res = await fetch(`${baseUrl}/services/${serviceId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch service");
    }
    const service = await res.json();

    return (
      <div>
        <SpaceAfterNavbar />

        <h1 className="font-bold text-2xl md:text-4xl text-center">
          {service.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-1 md:gap-4">
          <div className="mt-4">
            {/* service details */}
            <ServiceDetailsCard service={service} />
          </div>

          {/* payment section  */}
          <div className="mt-4 w-full p-4 md:px-8 lg:p-12 lg:px-96">
            <PaymentSection
              servicePrice={service.price}
              serviceId={service._id}
              serviceName={service.title}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching service:", error);
    return (
      <div className="text-center text-red-500">
        <p>Failed to load service details.</p>
        <p>Please try again later.</p>
      </div>
    );
  }
};

export default ServiceDetailsPage;
