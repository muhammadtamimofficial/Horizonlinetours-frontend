import TestimonialCard from "@/components/cards/TestimonialCard";
import { Testimonial } from "@/types/testimonialType";
import React from "react";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials,
}) => {
  return (
    <div>
      {testimonials &&
        testimonials.map((testimonial: Testimonial) => {
          return (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          );
        })}
    </div>
  );
};

export default TestimonialSlider;
