"use client";

import React from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

interface ImageUploaderProps {
  onSuccess: (result: CloudinaryUploadWidgetResults) => void;
  buttonText?: string;
  imageUploadbuttonStyle?: React.CSSProperties;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onSuccess,
  buttonText = "Upload an Image",
  imageUploadbuttonStyle,
}) => {
  return (
    <CldUploadWidget onSuccess={onSuccess} uploadPreset="horizonetours">
      {({ open }) => {
        return (
          <button style={imageUploadbuttonStyle} onClick={() => open()}>
            {buttonText}
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUploader;
