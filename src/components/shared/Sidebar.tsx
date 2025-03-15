"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const sidebarLinks = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "#services", label: "Services" },
  { href: "#testimonial", label: "Testimonial" },
  { href: "#contact", label: "Contact" },
  { href: "/gallery", label: "Gallery" },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleMenu }) => {
  const router = useRouter();

  // Scroll to section if query parameter exists
  useEffect(() => {
    const sectionId = window.location.hash.substring(1);
    if (sectionId) {
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // Delay to ensure the section is available
    }
  }, []);

  const handleScrollToSection = (id: string) => {
    if (window.location.pathname === "/") {
      // If already on Home, scroll to section
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on another page, navigate to Home and append hash
      router.push(`/#${id}`);
    }
    toggleMenu();
  };

  return (
    <>
      {isOpen && (
        <div onClick={toggleMenu} className="fixed inset-0 z-40"></div>
      )}

      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: isOpen ? "0%" : "-100%", opacity: isOpen ? 1 : 0 }}
        transition={{ stiffness: 500, opacity: { duration: 0.5 } }}
        className="fixed top-0 left-0 h-screen w-3/4 md:w-1/4 bg-black/90 p-16 z-50"
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-xl text-white transform transition-transform duration-200 hover:rotate-90 hover:cursor-pointer"
        >
          <RxCross1 />
        </button>

        <ul className="mt-10 space-y-4 text-lg text-white font-bold">
          {sidebarLinks.map(({ href, label }) => (
            <li key={href} className="hover:text-orange-500 cursor-pointer">
              {href.startsWith("#") ? (
                <a onClick={() => handleScrollToSection(href.substring(1))}>
                  {label}
                </a>
              ) : (
                <Link href={href} onClick={toggleMenu}>
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default Sidebar;
