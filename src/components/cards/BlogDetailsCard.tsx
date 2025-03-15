import { Blog } from "@/types/BlogType";
import React from "react";
import Image from "next/image";

const BlogDetailsCard = ({ blog }: { blog: Blog }) => {
  const {
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

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-4">
      {/* Blog Image */}
      <div className="relative w-full h-60 overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Blog Title */}
      <div>
        <h1 className="text-3xl text-center border-b-2 border-amber-200 pb-4 font-semibold text-gray-900">
          {title}
        </h1>
        <h1 className="font font-extralight text-2xl my-2">{`${day}/${month}/${year}`}</h1>
      </div>

      {/* Creator Info */}
      <div className="flex items-center space-x-4">
        <Image
          src={creatorImage}
          alt={creatorName}
          width={48}
          height={48}
          className="rounded-full border-2 border-gray-300"
        />
        <div>
          <p className="text-xl font-medium text-gray-800">{creatorName}</p>
          <p className="text-sm text-gray-500">{creatorEmail}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-lg text-gray-700">{description}</p>
    </div>
  );
};

export default BlogDetailsCard;
