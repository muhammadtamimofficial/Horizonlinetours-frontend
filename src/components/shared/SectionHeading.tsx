"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionHeadingProps {
  title: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title }) => {
  const titleCharacters = title.split("");
  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const typeOrErase = () => {
      timeoutIdRef.current = setTimeout(
        () => {
          if (typing) {
            if (charIndex < titleCharacters.length) {
              setDisplayedText((prev) => prev + titleCharacters[charIndex]);
              setCharIndex((prev) => prev + 1);
            } else {
              setTimeout(() => {
                setTyping(false);
                setCharIndex(titleCharacters.length - 1);
                typeOrErase();
              }, 500);
              return;
            }
          } else {
            if (charIndex >= 0) {
              setDisplayedText((prev) => prev.slice(0, prev.length - 1));
              setCharIndex((prev) => prev - 1);
            } else {
              setTimeout(() => {
                setTyping(true);
                setCharIndex(0);
                typeOrErase();
              }, 500);
              return;
            }
          }
          typeOrErase();
        },
        typing ? 80 : 40
      );
    };

    typeOrErase();

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [charIndex, titleCharacters, typing]);

  const estimatedCharWidth = 20; // Adjust this value based on your font and styling
  const containerWidth = titleCharacters.length * estimatedCharWidth;

  return (
    <div className="my-6 md:my-12 text-center">
      <h1 className="text-2xl md:text-4xl">
        <span className="border-l-[25px] border-blue-500 pl-4">
          <motion.span
            style={{
              display: "inline-flex",
              width: `${containerWidth}px`,
              overflow: "hidden", // Prevent characters from overflowing
            }}
          >
            <AnimatePresence initial={false}>
              {displayedText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {char}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.span>
        </span>
      </h1>
    </div>
  );
};

export default SectionHeading;
