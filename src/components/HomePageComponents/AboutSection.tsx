import Image from "next/image";
import React from "react";

const AboutSection = () => {
  return (
    <div className=" flex flex-col md:flex-row items-center justify-between gap-4 my-8 px-2 md:px-4">
      {/* Image Section */}
      <div className="w-full flex justify-center">
        <Image
          src="/aboutImage.jpg"
          height={1200}
          width={500}
          alt="AboutImage"
          className="rounded-sm"
        />
      </div>

      {/* Text Section */}
      <div className=" flex flex-col justify-center  text-center md:text-left">
        <h1 className="text-center font-bold text-4xl text-blue-400 md:text-[60px] mb-6">
          Welcome to Horizonetours
        </h1>
        <p className="text-sm md:text-base leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          consequatur ipsum, fuga dicta dignissimos, perferendis asperiores
          laboriosam a minima libero delectus sed quis maxime nostrum voluptatum
          ratione aliquam placeat eos fugit blanditiis velit repellat sapiente
          ad? Fugiat eos perferendis placeat eaque vel hic, eum dolorem
          expedita, explicabo voluptatibus ullam! Sapiente provident commodi,
          dolor a non architecto aperiam quos doloremque, ad velit, ipsum
          deserunt amet culpa excepturi illum temporibus facere sint delectus
          iusto explicabo deleniti consequuntur voluptatem.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
