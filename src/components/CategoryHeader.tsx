import React from "react";
import Image from "next/image";
import { RxDividerVertical } from "react-icons/rx";

interface CategoryHeaderProps {
  title: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title }) => {
  return (
    <div className="text-center relative overflow-hidden h-52">
      <Image
        src="/categoryPageHeader.jpg"
        alt="Gallery Header Background"
        fill
        className="object-cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-tr from-gray-900/70 to-gray-900/70 text-white p-10">
        <h1 className="text-4xl mb-4 flex items-center">
          <span className="text-green-400">Category</span>
          <RxDividerVertical />
          <span className="text-4xl">{title}</span>
        </h1>
      </div>
    </div>
  );
};

export default CategoryHeader;
