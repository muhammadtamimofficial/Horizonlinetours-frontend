"use client";
import { Service } from "@/types/servicesType";
import React from "react";
import SingleServiceCard from "./../cards/SingleServiceCard";

const AllServicesClientComponent = ({ services }: { services: Service[] }) => {
  return (
    <div>
      {services &&
        services.map((service) => {
          return <SingleServiceCard key={service._id} service={service} />;
        })}
    </div>
  );
};

export default AllServicesClientComponent;
