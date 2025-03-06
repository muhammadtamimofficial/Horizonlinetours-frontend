import Image from "next/image";
import React from "react";

const ServicesCard = ({ service }) => {
  const { title, image, description, price } = service;

  return (
    <div className="rounded-xl p-4">
      <div className="relative" style={{ height: "300px", width: "100%" }}>
        <Image
          src={image}
          alt={`Image of ${title}`}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div className="p-4">
        <h1 className="text-center font-bold text-2xl text-orange-400">
          {title}
        </h1>
        <p className="font-extralight my-4">{description}</p>
        <p className="text-center font-extralight text-[50px]">{price}</p>
        <div className="text-center mt-2">
          <button className="border border-green-300 p-4 hover:bg-green-300 hover:cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
