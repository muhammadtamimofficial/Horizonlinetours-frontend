import { Blog } from "@/types/BlogType";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const {
    _id,
    creatorName,
    creatorEmail,
    creatorImage,
    title,
    image,
    description,
  } = blog;

  console.log(_id);
  return (
    <div className="rounded overflow-hidden shadow-lg">
      {/* Use Next.js Image component for optimized image loading */}
      <div className="w-full h-48 relative">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t"
        />
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {description.slice(0, 20) + "..."}
          <Link href={`/blogs/${_id}`}> read more</Link>
        </p>
      </div>

      <div className="px-6 py-4 flex items-center">
        <div className="w-10 h-10 relative mr-4">
          {/* Creator image with Next.js Image component */}
          <Image
            src={creatorImage}
            alt={creatorName}
            layout="fill"
            className="rounded-full"
          />
        </div>
        <div>
          <p className="text-sm font-semibold">{creatorName}</p>
          <p className="text-xs text-gray-500">{creatorEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
