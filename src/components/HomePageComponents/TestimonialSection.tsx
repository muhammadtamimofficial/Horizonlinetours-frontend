import React from "react";

import TestimonialSlider from "./TestimonialSlider/TestimonialSlider";
import { baseUrl } from "@/utils/baseUrl";
import SectionHeading from "../shared/SectionHeading";

const TestimonialSection = async () => {
  // calling the testimonial API
  const res = await fetch(`${baseUrl}/testimonials`, {
    cache: "no-store",
  });
  const testimonials = await res.json();
  return (
    <div id="testimonial">
      <SectionHeading title="Testimonial" />
      <div>
        <TestimonialSlider testimonials={testimonials} />
      </div>
    </div>
  );
};

export default TestimonialSection;
