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
    createdAt,
  } = blog;

  const [year, month, day] = new Date(createdAt)
    .toISOString()
    .split("T")[0]
    .split("-")
    .map(Number);

  console.log("creator image", creatorImage);

  return (
    <div className="rounded relative overflow-hidden shadow-lg">
      <div className="w-full h-48 relative">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t"
        />
      </div>

      <div className="px-6 py-4 border-l-12 border-amber-600">
        <div className="font-bold text-xl mb-2 border-b-1 pb-8">{title}</div>
        <p className="text-gray-700 text-base my-4">
          {description.slice(0, 20) + "..."}
          <Link href={`/blogs/${_id}`}>
            {" "}
            <span className="text-blue-600 font-bold">read more</span>
          </Link>
        </p>
      </div>

      <div className="px-6 py-4 flex items-center">
        <div className="w-12 h-12 relative mr-4">
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
        <div className="absolute flex justify-center items-center top-2 right-2 bg-blue-500 h-25 w-25 rounded-full">
          <h1 className="font font-extralight">{`${day}/${month}/${year}`}</h1>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
