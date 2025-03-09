import DashboardNavbar from "@/components/DashboardComponents/shared/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardComponents/shared/DashboardSidebar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <div> {children}</div>
      </div>
    </div>
  );
};

export default layout;
