"use client";
import CreateBlogModal from "@/components/modals/CreateBlogModal";
import React, { useState } from "react";

const CreateBlogPage = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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
      <CreateBlogModal
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
      />
    </div>
  );
};

export default CreateBlogPage;
