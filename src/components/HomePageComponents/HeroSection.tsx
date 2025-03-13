import React from "react";

const HeroSection = () => {
  return (
    <div className="relative md:px-0">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-black opacity-30 z-10 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl sm:text-3xl md:text-[80px] font-extrabold">
            Welcome to
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            The Adventure of Bahamas
          </h1>
          <p className="text-sm md:text-4xl my-4 md:mb-4">
            Swimming Pigs • Private tours • Sightseeing tours • Wedding group
            tours
          </p>
          <span className="text-sm md:text-4xl">Stay In Touch</span>
        </div>
        <br />
      </div>

      <div className="relative h-[600px] overflow-hidden">
        <video
          width="100%"
          height="100%"
          autoPlay
          muted
          loop
          className="object-cover absolute top-0 left-0 w-full h-full z-0"
        >
          <source src="/videoBg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
