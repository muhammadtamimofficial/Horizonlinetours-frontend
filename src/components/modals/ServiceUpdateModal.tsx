"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Service } from "@/types/servicesType";
import { updateService } from "@/utils/actions/updateService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ImageUploader from "../ImageUpload/ImageUploader";
import {
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";

interface ServiceUpdateModalProps {
  id: string;
  service: Service | null;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ServiceUpdateModal({
  id,
  service,
  isUpdateModalOpen,
  setIsUpdateModalOpen,
}: ServiceUpdateModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
    category: "",
  });

  const [imageUrl, setImageUrl] = useState<string>(""); // Image upload URL state

  const router = useRouter();

  // Fill form with service details if available
  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        image: service.image,
        description: service.description,
        price: service.price,
        category: service.category,
      });
      setImageUrl(service.image); // Set existing image
    }
  }, [service]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle successful image upload
  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    const uploadedUrl = (result.info as CloudinaryUploadWidgetInfo)?.secure_url;
    setImageUrl(uploadedUrl);
    setFormData((prevData) => ({
      ...prevData,
      image: uploadedUrl, // Update formData with new image URL
    }));
  };

  // Update service functionality
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedData = { ...formData, image: imageUrl }; // Ensure latest image URL is included
      const response = await updateService(id, updatedData);

      if (response?.acknowledged === true) {
        toast.success("Service Updated Successfully");
        router.refresh();
        setIsUpdateModalOpen(false);
      } else {
        toast.error("Failed to update service");
      }
    } catch (error) {
      toast.error("An error occurred while updating the service");
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <Transition appear show={isUpdateModalOpen}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg backdrop-blur-md">
                <div className="absolute top-4 right-4">
                  <MdCancel
                    size={30}
                    className="text-gray-600 cursor-pointer hover:text-gray-800"
                    onClick={closeModal}
                  />
                </div>

                <DialogTitle
                  as="h3"
                  className="text-xl font-semibold text-gray-800"
                >
                  Update Service
                </DialogTitle>

                {/* image upload  */}
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="image"
                    className="text-lg font-medium text-gray-600"
                  >
                    Upload Image
                  </label>
                  <ImageUploader
                    onSuccess={handleUploadSuccess}
                    buttonText="Upload Image"
                    imageUploadbuttonStyle={{
                      padding: "10px 20px",
                      border: "1px solid gray",
                      borderRadius: "5px",
                      color: "black",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  />
                  {imageUrl && (
                    <div className="relative w-full h-40">
                      <Image
                        src={imageUrl}
                        alt="Uploaded Image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div className="my-2 w-full">
                      <label
                        htmlFor="title"
                        className="text-lg mt-2 font-medium text-gray-600"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter service title"
                        required
                        className="px-4 py-2 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="description"
                      className="text-lg font-medium text-gray-600"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter service description"
                      required
                      className="px-4 py-2 h-36 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="price"
                      className="text-lg font-medium text-gray-600"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      required
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="category"
                      className="text-lg font-medium text-gray-600"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a category</option>
                      <option value="Swimming Pigs">Swimming Pigs</option>
                      <option value="Private tours">Private tours</option>
                      <option value="Sightseeing tours">
                        Sightseeing tours
                      </option>
                      <option value="Wedding group tours">
                        Wedding group tours
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Update Service
                  </button>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
