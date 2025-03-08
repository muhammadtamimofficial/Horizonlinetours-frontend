import React from "react";
import { baseUrl } from "@/utils/baseUrl";
import CategoryCard from "../cards/CategoryCard";

const ServicesSection = async () => {
  // calling the services API
  const res = await fetch(`${baseUrl}/getServicesCategories`, {
    cache: "no-store",
  });
  const categories: string[] = await res.json();

  return (
    <div>
      <h1 className="font-bold text-4xl text-center my-8">Our Categories </h1>
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
