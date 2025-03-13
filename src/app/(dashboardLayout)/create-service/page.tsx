"use client";
import { createService } from "@/utils/actions/createService";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CreateServicePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
    category: "",
  });

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
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          <div className="flex flex-col space-y-2">
            <label htmlFor="image" className="text-lg font-medium">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
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
            <option value="Luxury Island Charters">
              Luxury Island Charters
            </option>
            <option value="Fishing Charters">Fishing Charters</option>
            <option value="Jet Ski Adventures">Jet Ski Adventures</option>
            <option value="WaterToys Rental">WaterToys Rental</option>
            <option value="Transportation Services">
              Transportation Services
            </option>
            <option value="Adventure & Hiking">Adventure & Hiking</option>
            <option value="Beach & Relaxation">Beach & Relaxation</option>
            <option value="Cultural & Heritage">Cultural & Heritage</option>
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
