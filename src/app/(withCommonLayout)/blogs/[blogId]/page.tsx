import BlogDetailsCard from "@/components/cards/BlogDetailsCard";
import SpaceAfterNavbar from "@/components/shared/SpaceAfterNavbar";
import { baseUrl } from "@/utils/baseUrl";
import React from "react";

const SingleBlogPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;

  const res = await fetch(`${baseUrl}/blogs/${blogId}`);
  const blog = await res.json();

  return (
    <div>
      <SpaceAfterNavbar />
      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default SingleBlogPage;
