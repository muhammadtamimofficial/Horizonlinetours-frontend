"use client";

import { getCurrentUserFromLocalStorage } from "@/utils/actions/getCurrentUserFromLocalStorage";
import { getUserByEmail } from "@/utils/actions/getUserByEmail";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(getCurrentUserFromLocalStorage());
        const userEmail = "jamanshah1@gmail.com"; // Replace with the actual email logic
        const fetchedUser = await getUserByEmail(userEmail);
        setUser(fetchedUser);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      console.log("user form dashboard", user);
    }
  }, [user]);

  const handleTestToast = () => {
    toast.success("This is a test toast!");
  };

  return (
    <div>
      <button onClick={handleTestToast} className="p-2 bg-blue-500 text-white">
        Show Test Toast
      </button>
    </div>
  );
};

export default ProfilePage;
