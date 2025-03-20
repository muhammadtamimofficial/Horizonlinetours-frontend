import { Service } from "@/types/servicesType";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ServicesCardProps {
  service: Service; // defining the type of service prop
}

const ServicesCard: React.FC<ServicesCardProps> = ({ service }) => {
  const { _id, title, image, description, price } = service;

  console.log("sevicecard", _id);

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
        <p className="text-center font-extralight text-[50px]">{`${price}$`}</p>
        <div className="text-center mt-2">
          <Link
            href={`/service/${_id}`}
            className="border border-green-300 p-4 hover:bg-green-300 hover:cursor-pointer"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
