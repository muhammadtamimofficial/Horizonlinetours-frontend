"use client";
import CreateBlogModal from "@/components/modals/CreateBlogModal";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Blog } from "@/types/BlogType";
import { baseUrl } from "@/utils/baseUrl";
import Image from "next/image";
import Swal from "sweetalert2";

const CreateBlogPage = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${baseUrl}/blogs`, { cache: "no-store" });
      const data: Blog[] = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${baseUrl}/blogs/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          await fetchBlogs();
          Swal.fire("Deleted!", "The blog has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Failed to delete the blog.", "error");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        Swal.fire(
          "Error!",
          "An error occurred while deleting the blog.",
          "error"
        );
      }
    }
  };

  return (
    <div>
      <div className="text-center mt-8">
        <button
          className="border p-4 cursor-pointer"
          onClick={() => setIsUpdateModalOpen(true)}
        >
          Create A Blog
        </button>
      </div>
      <div>
        <div className="text-center mt-8">
          <Link className="border p-4" href="/blogs">
            See All
          </Link>
        </div>
        <div>
          {loading ? (
            <p>Loading blogs...</p>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="border p-4 rounded-lg flex flex-col"
                >
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                  <p className="text-gray-600">
                    {truncateText(blog.description, 100)}
                    <Link
                      href={`/blogs/${blog._id}`}
                      className="text-blue-500 font-bold"
                    >
                      See it
                    </Link>
                    <button
                      onClick={() => {
                        if (blog._id) {
                          handleDelete(blog._id);
                        } else {
                          Swal.fire("Error!", "Invalid blog ID.", "error");
                        }
                      }}
                      className="cursor-pointer rounded-full ml-4 p-2 bg-red-400 text-white"
                    >
                      Delete
                    </button>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      </div>
      <CreateBlogModal
        setBlogs={setBlogs}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
      />
    </div>
  );
};

export default CreateBlogPage;
