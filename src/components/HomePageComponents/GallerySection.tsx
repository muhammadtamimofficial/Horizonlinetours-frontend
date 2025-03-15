"use client";
import { GalleryItem } from "@/types/galleryItemType";
import Image from "next/image";
import SectionHeading from "../shared/SectionHeading";
import Link from "next/link";

const GallerySection = () => {
  const galleryData: GalleryItem[] = [
    {
      title: "Image 1",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYbc03nxlxOom82ULAaM2AJrsGW39fPsrIHg&s",
    },
    {
      title: "Image 2",
      image:
        "https://static.vecteezy.com/system/resources/previews/023/334/791/non_2x/concept-of-travel-green-field-with-the-wonders-of-the-world-around-the-world-tours-photo.jpg",
    },
    {
      title: "Image 3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqGNPEcxhRePPkF3zLj1c2Z67EItsM4u03MA&s",
    },
    {
      title: "Image 4",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuubYu86WXJcF0BrpqwNHe87fP4mHx5_vcXw&s",
    },
    {
      title: "Image 5",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/4/297084137/ZR/MH/GQ/9160165/international-tour-package.jpg",
    },
    {
      title: "Image 6",
      image:
        "https://www.keralaholidays.com/uploads/tourpackages/main/wwww.jpg",
    },
    {
      title: "Image 7",
      image:
        "https://www.keralaholidays.com/uploads/tourpackages/main/wwww.jpg",
    },
  ];

  // Defining unique sizes for each image
  const imageSizes = [
    { width: 400, height: 600 }, // Tall image
    { width: 600, height: 400 }, // Wide image
    { width: 400, height: 400 }, // Square image
    { width: 600, height: 600 }, // Large square image
    { width: 400, height: 500 }, // Medium tall image
    { width: 500, height: 400 }, // Medium wide image
    { width: 300, height: 500 }, // Small tall image
    { width: 500, height: 300 }, // Small wide image
  ];

  return (
    <div>
      <SectionHeading title="Explore Our Gallery" />
      <Link href={`/gallery`} className="mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryData.map((item, index) => {
            const { width, height } = imageSizes[index % imageSizes.length]; // Cycle through sizes
            return (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden shadow-lg transition-transform transform cursor-pointer hover:scale-105"
                style={{
                  gridColumn: `span ${width > 500 ? 2 : 1}`, // Wider images span 2 columns
                  gridRow: `span ${height > 500 ? 2 : 1}`, // Taller images span 2 rows
                }}
              >
                <Image
                  src={item.image}
                  alt={`Gallery image ${index + 1}`}
                  width={width}
                  height={height}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-blue-500 bg-opacity-100 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity">
                  <p className="text-white text-lg font-semibold">View More</p>
                </div>
              </div>
            );
          })}
        </div>
      </Link>
    </div>
  );
};

export default GallerySection;
