import { CustomJwtPayload } from "@/app/(dashboardLayout)/layout";
import { jwtDecode } from "jwt-decode";

export const getCurrentUserFromLocalStorage = (): CustomJwtPayload | null => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded.email ? decoded : null;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
