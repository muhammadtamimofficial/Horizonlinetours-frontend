import React from "react";

import TestimonialSlider from "./TestimonialSlider/TestimonialSlider";
import { baseUrl } from "@/utils/baseUrl";

const TestimonialSection = async () => {
  // calling the testimonial API
  const res = await fetch(`${baseUrl}/testimonials`, {
    cache: "no-store",
  });
  const testimonials = await res.json();
  return (
    <div id="testimonial">
      <h1 className="font-bold text-4xl text-center my-8">Testimonial</h1>
      <div>
        <TestimonialSlider testimonials={testimonials} />
      </div>
    </div>
  );
};

export default TestimonialSection;
