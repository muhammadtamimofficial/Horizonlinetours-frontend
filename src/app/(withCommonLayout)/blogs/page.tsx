import BlogCard from "@/components/cards/BlogCard";
import SpaceAfterNavbar from "@/components/shared/SpaceAfterNavbar";
import { Blog } from "@/types/BlogType";
import { baseUrl } from "@/utils/baseUrl";
import React from "react";

const BlogsPage = async () => {
  const res = await fetch(`${baseUrl}/blogs`, {
    cache: "no-store",
  });

  const blogs: Blog[] = await res.json();

  return (
    <div>
      <SpaceAfterNavbar />
      <h1 className="font-bold text-4xl text-center mb-4">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs &&
          blogs.map((blog: Blog) => {
            return <BlogCard key={blog._id} blog={blog} />;
          })}
      </div>
    </div>
  );
};

export default BlogsPage;
