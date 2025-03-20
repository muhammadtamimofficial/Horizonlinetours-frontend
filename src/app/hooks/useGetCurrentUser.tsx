"use client";
import { User } from "@/types/userType";
import { getCurrentUserFromLocalStorage } from "@/utils/actions/getCurrentUserFromLocalStorage";
import { getUserByEmail } from "@/utils/actions/getUserByEmail";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetCurrentUser = () => {
  // Explicitly define the type of currentUser
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInToken = getCurrentUserFromLocalStorage();
        const userEmail = userInToken?.email;

        // Check if userEmail is defined
        if (userEmail) {
          const fetchedUser = await getUserByEmail(userEmail);
          setCurrentUser(fetchedUser);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        toast.error("Failed to fetch user data");
      }
    };

    fetchUser();
  }, []);

  // useEffect(() => {
  //   if (currentUser) {
  //     console.log("user form dashboard", currentUser);
  //   }
  // }, [currentUser]);

  return { currentUser };
};

export default useGetCurrentUser;
