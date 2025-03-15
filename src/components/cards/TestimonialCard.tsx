import { Testimonial } from "@/types/testimonialType";
import Image from "next/image";
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { userName, message, image, rating } = testimonial;

  // Generate star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) =>
      i < rating ? (
        <FaStar key={i} className="text-yellow-500" />
      ) : (
        <FaRegStar key={i} className="text-gray-300" />
      )
    );
  };

  return (
    <div className="p-6 shadow-lg bg-white text-center h-[300px]">
      <div className="flex flex-col items-center">
        <Image
          height={80}
          width={80}
          src={image}
          alt={image}
          className="rounded-full border-4 border-amber-500 "
        />
        <h2 className="mt-3 text-lg font-semibold">{userName}</h2>
        <div className="flex justify-center space-x-1">
          {renderStars(rating)}
        </div>
      </div>
      <p className="mt-4 text-gray-700 italic">{message}</p>
    </div>
  );
};

export default TestimonialCard;
