import React from "react";
import { baseUrl } from "@/utils/baseUrl";
import CategoryCard from "../cards/CategoryCard";
import SectionHeading from "../shared/SectionHeading";

export type Category = {
  category: string;
  image: string;
};

const ServicesSection = async () => {
  try {
    // Fetch categories from the API
    const res = await fetch(`${baseUrl}/getServicesCategories`);

    // Check if the response is successful
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    // Parse the response as an array of Category objects
    const categories: Category[] = await res.json();

    return (
      <div id="services">
        <SectionHeading title="Our Service Categories" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {categories.map((category: Category) => (
            <CategoryCard
              key={category.category}
              category={category.category}
              image={category.image}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return (
      <div className="text-red-500 text-center py-8">
        Failed to load categories. Please try again later.
      </div>
    );
  }
};

export default ServicesSection;
