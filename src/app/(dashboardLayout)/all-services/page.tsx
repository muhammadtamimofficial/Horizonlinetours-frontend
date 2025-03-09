import AllServicesClientComponent from "@/components/DashboardComponents/AllServicesClientComponent";
import { Service } from "@/types/servicesType";
import { baseUrl } from "@/utils/baseUrl";
import React from "react";

const AllServicesPage = async () => {
  const res = await fetch(`${baseUrl}/services`);
  const services: Service[] = await res.json();
  return (
    <div>
      <div className="mt-4">
        <AllServicesClientComponent services={services} />
      </div>
    </div>
  );
};

export default AllServicesPage;
