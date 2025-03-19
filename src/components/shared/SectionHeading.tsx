"use client";
import React from "react";
import { motion, useAnimationControls } from "framer-motion";

interface SectionHeadingProps {
  title: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title }) => {
  // Split the title into individual characters
  const titleCharacters = title.split("");

  // Animation controls
  const controls = useAnimationControls();

  // Function to start the infinite loop
  React.useEffect(() => {
    const animate = async () => {
      while (true) {
        await controls.start("hidden"); // Hide from left to right
        await controls.start("visible"); // Show from right to left
      }
    };
    animate();
  }, [controls]);

  return (
    <div className="my-6 md:my-12 text-center">
      <h1 className="text-2xl md:text-4xl">
        {/* Static border */}
        <span className="border-l-[25px] border-blue-500 pl-4">
          {/* Animate each character */}
          <motion.span
            style={{ display: "inline-flex" }}
            initial="visible"
            animate={controls}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05, // Delay between each character
                  staggerDirection: 1, // Left to right
                },
              },
              hidden: {
                transition: {
                  staggerChildren: 0.05, // Delay between each character
                  staggerDirection: -1, // Right to left
                },
              },
            }}
          >
            {titleCharacters.map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  visible: { opacity: 1 },
                  hidden: { opacity: 0 },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </span>
      </h1>
    </div>
  );
};

export default SectionHeading;
