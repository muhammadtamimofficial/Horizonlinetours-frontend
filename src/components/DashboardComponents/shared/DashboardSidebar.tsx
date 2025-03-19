"use client";
import useGetCurrentUser from "@/app/hooks/useGetCurrentUser";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
  const pathname = usePathname();

  // get current user
  const { currentUser } = useGetCurrentUser();
  const role: string | undefined = currentUser?.role;

  const sidebarLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Profile" },
  ];

  if (role === "admin") {
    sidebarLinks.push(
      { href: "/create-service", label: "Create Service" },
      { href: "/all-services", label: "All Services" },
      { href: "/create-blog", label: "Blogs" },
      { href: "/add-gallery", label: "Gallery" },
      { href: "/user-orders", label: "User Orders" }
    );
  } else if (role === "user") {
    sidebarLinks.push({ href: "/user-orders", label: "My Orders" });
  }

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-5 shadow-lg">
      <div className="text-2xl font-bold mb-6 text-center">Dashboard</div>
      <nav className="flex-1">
        <ul>
          {sidebarLinks.map((link) => (
            <li key={link.href} className="mb-2">
              <Link
                href={link.href}
                className={`block px-4 py-2 transition ${
                  pathname === link.href ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md mt-auto">
        Logout
      </button>
    </div>
  );
};

export default DashboardSidebar;
