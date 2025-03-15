import Image from "next/image";
import React from "react";

// Define the props interface
interface GalleryCardProps {
  title: string;
  image: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ title, image }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <Image
        src={image}
        alt={title}
        width={500}
        height={300}
        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
      />

      {/* Overlay with Title */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default GalleryCard;
