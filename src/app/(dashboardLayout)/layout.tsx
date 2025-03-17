"use client";
import DashboardNavbar from "@/components/DashboardComponents/shared/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardComponents/shared/DashboardSidebar";
import { getCurrentUserFromLocalStorage } from "@/utils/actions/getCurrentUserFromLocalStorage";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

import { JwtPayload } from "jwt-decode";
import { getUserByEmail } from "@/utils/actions/getUserByEmail";
import PageLoader from "@/components/loading/PageLoader";

// Extend JwtPayload to include the `email` property
export interface CustomJwtPayload extends JwtPayload {
  email: string;
}

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUser] = useState<CustomJwtPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [userInDb, setUserInDb] = useState<boolean>(false);
  const router = useRouter(); // Initialize the router

  // checking if user is valid
  useEffect(() => {
    const checkUserValidity = async () => {
      const currentUser =
        getCurrentUserFromLocalStorage() as CustomJwtPayload | null;
      console.log("Decoded Current User:", currentUser); // Debugging log

      if (currentUser && currentUser.email) {
        setUser(currentUser);
        console.log("from dashboard layout", currentUser);

        try {
          const dbUser = await getUserByEmail(currentUser.email);
          console.log("User from DB:", dbUser); // Debugging log
          setUserInDb(!!dbUser);
        } catch (error) {
          console.error("Error fetching user from database:", error);
          setUserInDb(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkUserValidity();
  }, []);

  // Redirect to login if user is unauthorized
  useEffect(() => {
    if (!loading && (!user || !userInDb)) {
      router.push("/login"); // Redirect to the login page
    }
  }, [loading, user, userInDb, router]);

  if (loading) {
    return <PageLoader />;
  }

  // If no user is found in local storage or the user does not exist in the database
  if (!user || !userInDb) {
    return null; // Return null to prevent rendering the layout
  }

  // Render the layout only if the user exists in the database
  return (
    <div className="h-screen flex flex-col">
      <DashboardNavbar />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
