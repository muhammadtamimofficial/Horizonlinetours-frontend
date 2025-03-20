import React from "react";

interface SectionHeadingProps {
  title: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title }) => {
  return (
    <div className="text-center my-2 md:my-8">
      <h1 className="text-2xl md:text-4xl">{title}</h1>
    </div>
  );
};

export default SectionHeading;
