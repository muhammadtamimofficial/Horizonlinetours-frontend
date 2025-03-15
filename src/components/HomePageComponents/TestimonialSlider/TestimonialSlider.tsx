"use client";

import TestimonialCard from "@/components/cards/TestimonialCard";
import { Testimonial } from "@/types/testimonialType";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Swiper as SwiperCore } from "swiper"; // Import Swiper type

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
  // Properly type the swiperRef
  const swiperRef = useRef<SwiperCore | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto px-6 py-12 bg-blue-400 shadow-2xs overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // Store Swiper instance
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        className="relative"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial._id} className="flex justify-center">
            <TestimonialCard testimonial={testimonial} />
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <button
          className={`absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer bg-white/50 backdrop-blur-lg shadow-xl rounded-full w-12 h-12 flex items-center justify-center transition-all hover:bg-white hover:scale-110 z-10 ${
            isBeginning ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => !isBeginning && swiperRef.current?.slidePrev()}
        >
          <FaChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <button
          className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer bg-white/50 backdrop-blur-lg shadow-xl rounded-full w-12 h-12 flex items-center justify-center transition-all hover:bg-white hover:scale-110 z-10 ${
            isEnd ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => !isEnd && swiperRef.current?.slideNext()}
        >
          <FaChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
