import React from "react";
import Image from "next/image";
// Define the props interface
interface SectionHeaderWithImageProps {
  title: string;
  imageUrl: string;
}

const SectionHeaderWithImage: React.FC<SectionHeaderWithImageProps> = ({
  title,
  imageUrl,
}) => {
  return (
    <div className="m-4 rounded-2xl text-center relative overflow-hidden h-96">
      <Image
        src={imageUrl}
        alt="Gallery Header Background"
        fill
        className="object-cover"
        quality={100}
        priority
      />
      {/* Overlay with text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-tr from-gray-900/70 to-gray-900/70 text-white p-10">
        <h1 className="text-4xl mb-4">
          <span className="text-green-400">{title}</span>
        </h1>
        <p className="text-2xl">Horizonetours | {title}</p>
      </div>
    </div>
  );
};

export default SectionHeaderWithImage;
