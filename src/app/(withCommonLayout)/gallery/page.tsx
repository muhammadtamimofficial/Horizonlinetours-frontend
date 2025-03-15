import SectionHeaderWithImage from "@/components/DashboardComponents/shared/SectionHeaderWithImage";
import SpaceAfterNavbar from "@/components/shared/SpaceAfterNavbar";
import { GalleryItem } from "@/types/galleryItemType";
import React from "react";
import GalleryCard from "@/components/cards/GalleryCard";

const GalleryPage = () => {
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
      <SpaceAfterNavbar />
      <SectionHeaderWithImage title="Gallery" imageUrl="/galleryHeader.jpg" />

      {/* Gallery Grid */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryData.map((item, index) => (
            <GalleryCard key={index} title={item.title} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
