import { Testimonial } from "@/types/testimonialType";
import Image from "next/image";
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa"; // Import the star icons from react-icons

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { name, message, image, rating } = testimonial;

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i}>
          {i < rating ? (
            <FaStar className="text-yellow-500" /> // Filled star
          ) : (
            <FaRegStar className="text-gray-300" /> // Empty star
          )}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <Image
          height={50}
          width={50}
          src={image}
          alt={`Image of ${name}`}
          className="rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{name}</h2>
          <div className="flex">{renderStars(rating)}</div>{" "}
          {/* Display stars */}
        </div>
      </div>
      <div>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
