import BlogCard from "@/components/cards/BlogCard";
import SectionHeaderWithImage from "@/components/shared/SectionHeaderWithImage";
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
      <SectionHeaderWithImage
        title="Blogs"
        imageUrl="/blogHeader.jpg"
        height="52"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-8">
        {blogs &&
          blogs.map((blog: Blog) => {
            return <BlogCard key={blog._id} blog={blog} />;
          })}
      </div>
    </div>
  );
};

export default BlogsPage;
