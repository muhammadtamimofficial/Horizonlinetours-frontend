import React from "react";

const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-black opacity-30 z-10 flex items-center justify-center">
        <h1 className="text-white font-extrabold text-[50px] text-center">
          WELCOME TO OUR WEBSITE
        </h1>
      </div>

      <div className="relative h-2/3 overflow-hidden">
        <video
          width="100%"
          height="100%"
          autoPlay
          muted
          loop
          className="object-cover absolute top-0 left-0 w-full h-full z-0"
        >
          <source src="videoBg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
