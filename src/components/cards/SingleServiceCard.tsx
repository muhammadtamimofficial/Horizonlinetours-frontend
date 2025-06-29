"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Service } from "@/types/servicesType";
import { deleteService } from "@/utils/actions/deleteService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ServiceUpdateModal from "../modals/ServiceUpdateModal";
import { baseUrl } from "@/utils/baseUrl";
import Swal from "sweetalert2";

interface SingleServiceCardProps {
  service: Service;
}

const SingleServiceCard: React.FC<SingleServiceCardProps> = ({ service }) => {
  const { _id, title, price, image } = service;

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [serviceDetails, setServiceDetails] = useState<Service | null>(null);

  const router = useRouter();

  // Fetching service details by ID
  const fetchServiceById = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/services/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch service: ${response.statusText}`);
      }
      const textResponse = await response.text(); // Get raw response
      const data = JSON.parse(textResponse); // Parse JSON manually
      setServiceDetails(data);
    } catch (error) {
      console.error("Failed to fetch service:", error);
      toast.error("Failed to fetch service details.");
    }
  };

  // Deleting service function
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (!_id) {
          toast.error("Service ID is undefined.");
          return;
        }
        try {
          await deleteService(_id);
          toast.success("Deleted Successfully");
          router.refresh();
        } catch (error) {
          console.error("Failed to delete service:", error);
          toast.error("Failed to delete service.");
        }
      }
    });
  };

  // Handling update button click and fetching service details by id
  const handleUpdateClick = () => {
    if (!_id) {
      toast.error("Service ID is undefined.");
      return;
    }
    fetchServiceById(_id);
    setIsUpdateModalOpen(true);
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
        <button
          onClick={handleUpdateClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600  hover:cursor-pointer"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer"
        >
          Delete
        </button>
      </div>

      {/* Passing the id and serviceDetails to the ServiceUpdateModal */}
      <ServiceUpdateModal
        id={_id!}
        service={serviceDetails} // Ensure service is not null
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
      />
    </div>
  );
};

export default SingleServiceCard;
