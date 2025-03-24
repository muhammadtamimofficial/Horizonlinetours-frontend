"use client";
import React, { useState, useEffect } from "react";
import { HiOutlineMenuAlt1, HiOutlineMenu } from "react-icons/hi";
import Sidebar from "./Sidebar";
import useGetCurrentUser from "@/app/hooks/useGetCurrentUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const router = useRouter();

  // getting current user
  const { currentUser } = useGetCurrentUser();
  const role: string | undefined = currentUser?.role;

  // Update isLoggedIn state based on currentUser
  useEffect(() => {
    setIsLoggedIn(!!currentUser);
  }, [currentUser]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false); // Update login state
    router.push("/"); // Redirect to the home page
    toast.success("Successfully Logout");
  };

  return (
    <div
      className={`fixed w-full top-0 z-20 transition-all duration-300 ${
        isScrolled
          ? "bg-opacity-30 bg-white text-black shadow-xl"
          : "bg-transparent text-white"
      }`}
    >
      <div className="flex items-center justify-between py-4 md:p-4 max-w-11/12 mx-auto">
        <div
          onClick={toggleMenu}
          className="flex items-center space-x-2 group cursor-pointer text-black hover:text-orange-500 transition-colors duration-500"
        >
          <span>MENU</span>
          <HiOutlineMenuAlt1 className="group-hover:hidden" />
          <HiOutlineMenu className="hidden group-hover:inline" />
        </div>
        <div>
          <h1 className="font-bold md:text-2xl text-black">Logo</h1>
        </div>

        <div className="pt-2 flex items-center gap-1 md:gap-4">
          <div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="p-2 md:p-4 cursor-pointer rounded-full text-black border border-red-700 font-extralight text-xm"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="p-2 md:p-4 rounded-full text-black border border-blue-700 font-extralight text-xm"
              >
                Login
              </Link>
            )}
          </div>
          {role === "admin" ? (
            <Link
              href="/dashboard"
              className="text-black border p-2 md:p-4 border-amber-400 hover:bg-amber-400 cursor-pointer transition duration-500"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="#services"
              className="text-black border p-2 md:p-4 border-amber-400 hover:bg-amber-400 cursor-pointer transition duration-500"
            >
              Book Now
            </Link>
          )}
        </div>
      </div>

      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Navbar;
