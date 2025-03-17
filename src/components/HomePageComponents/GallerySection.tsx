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

  return (
    <div>
      <SectionHeading title="Explore Our Gallery" />
      <Link href={`/gallery`} className="mx-auto p-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryData.map((item, index) => (
            <div
              key={index}
              className="relative group rounded-lg overflow-hidden shadow-lg transition-transform transform cursor-pointer hover:scale-105"
            >
              <Image
                src={item.image}
                alt={`Gallery image ${index + 1}`}
                width={600} // Default width
                height={400} // Default height
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-blue-500 bg-opacity-100 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity">
                <p className="text-white text-lg font-semibold">View More</p>
              </div>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default GallerySection;
