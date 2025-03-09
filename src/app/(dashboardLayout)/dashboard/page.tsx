"use client";
import React from "react";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const handleTestToast = () => {
    toast.success("This is a test toast!");
  };
  return (
    <div>
      <button onClick={handleTestToast} className="p-2 bg-blue-500 text-white">
        Show Test Toast
      </button>
      ;
    </div>
  );
};

export default ProfilePage;
