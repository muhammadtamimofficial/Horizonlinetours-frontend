"use client";
import useGetCurrentUser from "@/app/hooks/useGetCurrentUser";
import Image from "next/image";

const ProfilePage = () => {
  const { currentUser } = useGetCurrentUser();

  // Destructure user data
  const { username, email, image } = currentUser || {};

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <div className="flex flex-col items-center sm:flex-row sm:items-start">
              {/* Profile Image */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                <Image
                  src={
                    image ||
                    "https://st2.depositphotos.com/1007566/11541/v/950/depositphotos_115416492-stock-illustration-avatar-business-man-vector-graphic.jpg"
                  }
                  alt={username || "User"}
                  fill // Fill the container
                  className="object-cover" // Ensure the image covers the container
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive image sizes
                />
              </div>

              {/* Profile Info */}
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-white">
                  {username || "Guest"}
                </h1>
                <p className="text-gray-200">{email || "No email provided"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
