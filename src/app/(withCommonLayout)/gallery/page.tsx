"use client"; // Ensure this is a Client Component
import { GalleryItem } from "@/types/galleryItemType";
import React, { useEffect, useState } from "react";
import GalleryCard from "@/components/cards/GalleryCard";
import SpaceAfterNavbar from "@/components/shared/SpaceAfterNavbar";
import SectionHeaderWithImage from "@/components/shared/SectionHeaderWithImage";
import { getGalleries } from "@/utils/actions/getGalleries";
import PageLoader from "@/components/loading/PageLoader";

const GalleryPage = () => {
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch gallery data on component mount
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const data = await getGalleries();
        if (data) {
          setGalleryData(data);
        } else {
          setError("No gallery data found.");
        }
      } catch (err) {
        setError("Failed to fetch gallery data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div>
      <SpaceAfterNavbar />
      <SectionHeaderWithImage
        title="Gallery"
        imageUrl="/galleryHeader.jpg"
        height="64"
      />
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
