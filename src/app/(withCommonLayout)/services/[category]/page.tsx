import ServicesCard from "@/components/cards/ServicesCard";
import CategoryHeader from "@/components/CategoryHeader";
import { Service } from "@/types/servicesType";
import { baseUrl } from "@/utils/baseUrl";
import React from "react";

interface PageProps {
  params: Promise<{ category: string }>;
}

const CategoryPage = async ({ params }: PageProps) => {
  const { category } = await params;

  const res = await fetch(`${baseUrl}/services/category/${category}`);
  const services = await res.json();

  return (
    <div>
      <CategoryHeader title={decodeURIComponent(category)} />
      <h1 className="font-bold text-4xl text-center"></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
        {services &&
          services.map((service: Service) => {
            return <ServicesCard key={service._id} service={service} />;
          })}
      </div>
    </div>
  );
};

export default CategoryPage;
