import React from "react";
import { FaLocationDot, FaInstagram, FaCcVisa } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { LuCopyright } from "react-icons/lu";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-8 md:p-18 mt-8 text-white">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Left Side */}
        <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-between pr-0 md:pr-24 text-center md:text-left">
          {/* Icons and Address */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="flex items-center gap-4">
              <FaLocationDot className="text-2xl md:text-4xl" />
              <div>
                <p>22 Street</p>
                <p className="font-bold">Us, Bahama</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <IoCallOutline className="text-2xl md:text-4xl" />
              <div>
                <p className="font-bold">++0000333</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CiMail className="text-2xl md:text-4xl" />
              <div>
                <p className="font-bold">support@company.com</p>
              </div>
            </div>
            <div className="flex text-2xl md:text-4xl gap-4 justify-center md:justify-start">
              <FaFacebookF className="rounded-sm p-2 bg-gray-300 text-blue-500" />
              <FaInstagram className="rounded-sm p-2 bg-gray-300 text-black" />
              <FaYoutube className="rounded-sm p-2 bg-gray-300 text-red-400" />
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 md:mt-0">
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-gray-400">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-gray-400">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="#testimonial" className="hover:text-gray-400">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-gray-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <div>
            <h1 className="text-2xl md:text-4xl mb-4 text-center md:text-left">
              About The Company
            </h1>
            <p className="text-sm md:text-base text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis suscipit tenetur aperiam temporibus doloremque dolore
              quisquam deleniti eius nulla facere, reiciendis magni? Culpa
              explicabo soluta cupiditate, minus animi vitae mollitia rerum.
              Animi tenetur sapiente voluptate totam. Distinctio alias
              consectetur debitis ad? Cumque placeat architecto est ratione
              pariatur facilis, dolore fugit.
            </p>
            <div className="mt-4">
              <h1 className="text-2xl md:text-4xl mb-4 text-center md:text-left">
                Payment:
              </h1>
              <div className="flex justify-center md:justify-start">
                <FaCcVisa className="text-4xl md:text-8xl text-amber-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <LuCopyright /> <span>2022 - {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
