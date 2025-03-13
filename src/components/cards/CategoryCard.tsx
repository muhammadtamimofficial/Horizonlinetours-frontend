import Link from "next/link";
import Image from "next/image";
import React from "react";

// Type of category
interface CategoryCardProps {
  category: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  image,
}: CategoryCardProps) => {
  return (
    <Link
      href={`/services/${category}`}
      className="group relative rounded-2xl h-52 overflow-hidden hover:cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full h-full">
        <Image
          src={image}
          alt={category}
          fill
          className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black opacity-100 group-hover:opacity-30 transition-opacity duration-300">
        <div className="font-bold p-6 text-center">
          <h1 className="text-2xl md:text-4xl mb-2 text-orange-300 font-extralight">
            {category}
          </h1>
          <p className="text-sm md:text-2xl text-white font-extralight">
            Explore {category}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
