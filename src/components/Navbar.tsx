"use client";
import React, { useState } from "react";
import { HiOutlineMenuAlt1, HiOutlineMenu } from "react-icons/hi";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="flex justify-between p-8 max-w-11/12 mx-auto">
        <div
          onClick={toggleMenu}
          className="flex items-center space-x-2 group cursor-pointer hover:text-orange-500 transition-colors duration-500"
        >
          <span>MENU</span>
          <HiOutlineMenuAlt1 className="group-hover:hidden" />
          <HiOutlineMenu className="hidden group-hover:inline" />
        </div>

        <div>
          <h1 className="font-bold text-2xl">Logo</h1>
        </div>
        <div>Book Now</div>
      </div>

      {/* calling the sidebar component*/}
      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Navbar;
