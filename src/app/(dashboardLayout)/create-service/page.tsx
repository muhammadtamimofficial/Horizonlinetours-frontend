"use client";
import ImageUploader from "@/components/ImageUpload/ImageUploader";
import { createService } from "@/utils/actions/createService";
import {
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const CreateServicePage = () => {
  // image url
  const [imageUrl, setImageUrl] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
    category: "",
  });

  // Update formData when imageUrl changes
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      image: imageUrl,
    }));
  }, [imageUrl]);

  // style of upload button
  const imageUploadbuttonStyle = {
    padding: "10px 20px",
    border: "1px solid gray",
    borderRadius: "5px",
    color: "black",
    cursor: "pointer",
    width: "100%",
  };

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

  // handle upload success
  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    setImageUrl((result.info as CloudinaryUploadWidgetInfo)?.secure_url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createService(formData);
      if (response?.acknowledged === true) {
        toast.success("Service Created Successfully");
        setFormData({
          title: "",
          image: "",
          description: "",
          price: "",
          category: "",
        });
        setImageUrl("");
      } else {
        toast.error("Failed to create service");
      }
      console.log(response);
    } catch (error) {
      toast.error("An error occurred while creating the service");
      console.error(error);
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Create Service
      </h1>
      <div>
        <label htmlFor="image" className="text-lg font-medium text-gray-700">
          Service Image
        </label>
        <ImageUploader
          onSuccess={handleUploadSuccess}
          buttonText="Upload"
          imageUploadbuttonStyle={imageUploadbuttonStyle}
        />
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="">
          <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="text-lg font-medium">
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
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="text-lg font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter service description"
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="price" className="text-lg font-medium">
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
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="category" className="text-lg font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a category</option>
            <option value="Swimming Pigs">Swimming Pigs</option>
            <option value="Private tours">Private tours</option>
            <option value="Sightseeing tours">Sightseeing tours</option>
            <option value="Wedding group tours">Wedding group tours</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none hover:cursor-pointer focus:ring-2 focus:ring-indigo-500"
        >
          Create Service
        </button>
      </form>
    </div>
  );
};

export default CreateServicePage;
