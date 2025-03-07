"use client";

import TestimonialCard from "@/components/cards/TestimonialCard";
import { Testimonial } from "@/types/testimonialType";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials,
}) => {
  return (
    <div className="relative w-[300px] sm-[640px] md:w-[700px] lg:w-[1500px] mx-auto px-6 py-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1} // Default for mobile
        breakpoints={{
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 2 }, // Show 2 slides on large screens (matches image)
        }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="relative"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="flex justify-center">
            <TestimonialCard testimonial={testimonial} />
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"></div>
        <div className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"></div>
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
