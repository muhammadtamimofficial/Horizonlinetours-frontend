"use client";
import { GalleryItem } from "@/types/galleryItemType";
import Image from "next/image";
import SectionHeading from "../shared/SectionHeading";
import Link from "next/link";
import { getGalleries } from "@/utils/actions/getGalleries";
import { useEffect, useState } from "react";

const GallerySection = () => {
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    return <div className="text-center py-8">Loading gallery...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeading title="Explore Our Gallery" />
      <Link href="/gallery" className="block">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
