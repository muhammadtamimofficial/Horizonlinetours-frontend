"use client";

import React from "react";
import ImageUploader from "@/components/ImageUpload/ImageUploader";
import SpaceAfterNavbar from "@/components/shared/SpaceAfterNavbar";
import {
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";

const UploadPage = () => {
  const imageUploadbuttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    console.log(
      "Image URL:",
      (result.info as CloudinaryUploadWidgetInfo)?.secure_url
    );
  };

  return (
    <div>
      <SpaceAfterNavbar />
      <div>Upload Image</div>
      <ImageUploader
        onSuccess={handleUploadSuccess}
        buttonText="Upload"
        imageUploadbuttonStyle={imageUploadbuttonStyle}
      />
    </div>
  );
};

export default UploadPage;
