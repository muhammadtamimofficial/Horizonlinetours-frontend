"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically importing GridLoader with SSR disabled
const GridLoader = dynamic(() => import("react-spinners/GridLoader"), {
  ssr: false, // This ensures the component is only rendered on the client side
});

const PageLoader = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set isClient to true after the component mounts
  }, []);

  // Return null during server-side rendering
  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <GridLoader
        color="#36D7B7"
        loading={true}
        size={15}
        margin={2}
        speedMultiplier={1}
      />
    </div>
  );
};

export default PageLoader;
