import ServicesCard from "@/components/cards/ServicesCard";
import { Service } from "@/types/servicesType";
import { baseUrl } from "@/utils/baseUrl";
import React from "react";

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const { category } = params;

  const res = await fetch(`${baseUrl}/services/category/${category}`);
  const services = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
      {services &&
        services.map((service: Service) => {
          return <ServicesCard key={service._id} service={service} />;
        })}
    </div>
  );
};

export default CategoryPage;
