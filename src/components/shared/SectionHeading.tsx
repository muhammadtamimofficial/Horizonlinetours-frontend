import React from "react";

interface SectionHeadingProps {
  title: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title }) => {
  return (
    <div className="my-6 text-center">
      <h1 className="text-4xl"> {title}</h1>
    </div>
  );
};

export default SectionHeading;
