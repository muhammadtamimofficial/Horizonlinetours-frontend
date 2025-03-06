import React from "react";
import ServicesCard from "./../cards/ServicesCard";
import { Service } from "@/types/servicesType";

const ServicesSection = async () => {
  // calling the services API
  const res = await fetch("http://localhost:5000/services", {
    cache: "no-store",
  });
  const services = await res.json();

  return (
    <div
      id="services"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {services &&
        services.map((service: Service) => {
          return <ServicesCard key={service.id} service={service} />;
        })}
    </div>
  );
};

export default ServicesSection;
