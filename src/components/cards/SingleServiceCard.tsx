"use client";
import React from "react";
import Image from "next/image";
import { Service } from "@/types/servicesType";
import { deleteService } from "@/actions/deleteService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface SingleServiceCardProps {
  service: Service;
}

const SingleServiceCard: React.FC<SingleServiceCardProps> = ({ service }) => {
  const { _id, title, price, image } = service;

  // using user router for refreshing the page
  const router = useRouter();

  const handleDelete = async () => {
    if (_id) {
      await deleteService(_id);
      toast.success("Delete Successfully");
      router.refresh();
    } else {
      console.error("Service ID is undefined");
    }
  };
  return (
    <div className="flex items-center justify-between p-4 border rounded shadow-md">
      <div className="flex items-center space-x-4">
        <div className="relative w-12 h-12">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-600">{price}</p>
        </div>
      </div>
      <div className="space-x-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600  hover:cursor-pointer">
          Update
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleServiceCard;
