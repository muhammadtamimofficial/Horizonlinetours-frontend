import Link from "next/link";
import React from "react";

// type of category
interface CategoryCardProps {
  category: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
}: CategoryCardProps) => {
  return (
    <Link
      href={`/services/${category}`}
      className="border p-12 rounded-xl  hover:bg-amber-300 hover:cursor-pointer"
    >
      <h1 className="font-extralight text-[30px] text-center text-blue-500">
        {category}
      </h1>
    </Link>
  );
};

export default CategoryCard;
