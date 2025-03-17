"use client";
import React, { useState, useEffect } from "react";
import { HiOutlineMenuAlt1, HiOutlineMenu } from "react-icons/hi";
import Sidebar from "./Sidebar";
import useGetCurrentUser from "@/app/hooks/useGetCurrentUser";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // getting current user
  const { currentUser } = useGetCurrentUser();
  const role: string | undefined = currentUser?.role;

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

  return (
    <div
      className={`fixed w-full top-0 z-20 transition-all duration-300 ${
        isScrolled
          ? "bg-opacity-30 bg-white text-black shadow-xl"
          : "bg-transparent text-white"
      }`}
    >
      <div className="flex justify-between py-4 md:p-4 max-w-11/12 mx-auto">
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
        {role === "admin" ? (
          <Link
            href="/dashboard"
            className="text-black border p-2 md:p-4 border-amber-400 hover:bg-amber-400 cursor-pointer transition duration-500"
          >
            Dashboard
          </Link>
        ) : (
          <div className="text-black border p-2 md:p-4 border-amber-400 hover:bg-amber-400 cursor-pointer transition duration-500">
            Book Now
          </div>
        )}
      </div>

      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Navbar;
