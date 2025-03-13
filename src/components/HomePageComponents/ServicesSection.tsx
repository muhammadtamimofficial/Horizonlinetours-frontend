import React from "react";
import { baseUrl } from "@/utils/baseUrl";
import CategoryCard from "../cards/CategoryCard";
import SectionHeading from "../shared/SectionHeading";

const ServicesSection = async () => {
  // calling the services API
  const res = await fetch(`${baseUrl}/getServicesCategories`, {
    cache: "no-store",
  });
  const categories: string[] = await res.json();

  return (
    <div>
      <SectionHeading title="Our Service Category" />
      <div
        id="services"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {categories &&
          categories.map((category: string) => {
            return <CategoryCard key={category} category={category} />;
          })}
      </div>
    </div>
  );
};

export default ServicesSection;
