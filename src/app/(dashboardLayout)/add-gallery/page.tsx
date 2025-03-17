"use client";
import ImageUploader from "@/components/ImageUpload/ImageUploader";
import { GalleryItem } from "@/types/galleryItemType";
import { createGallery } from "@/utils/actions/createGallery";
import {
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import React, { useState } from "react";
import toast from "react-hot-toast";

type FormData = {
  title: string;
};

const GalleryPage: React.FC = () => {
  // image url
  const [imageUrl, setImageUrl] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    title: "",
  });

  // style of upload button
  const imageUploadbuttonStyle = {
    padding: "10px 20px",
    border: "1px solid gray",
    borderRadius: "5px",
    color: "black",
    cursor: "pointer",
    width: "100%",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (!imageUrl) {
      return toast.error("Upload An Image");
    }
    try {
      const galleryData: GalleryItem = {
        title: formData.title,
        image: imageUrl,
      };
      const res = await createGallery(galleryData);
      console.log(res);
      if (res?.acknowledged === true) {
        toast.success("Gallery Item Created Successfully");
        setFormData({
          title: "",
        });
        setImageUrl("");
      }
    } catch (error) {
      toast.error("An error occurred while creating the gallery item");
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Add Image to Gallery
      </h1>
      <div>
        <label htmlFor="image" className="text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <ImageUploader
          onSuccess={handleUploadSuccess}
          buttonText="Upload"
          imageUploadbuttonStyle={imageUploadbuttonStyle}
        />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter image title"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add to Gallery
        </button>
      </form>
    </div>
  );
};

export default GalleryPage;
