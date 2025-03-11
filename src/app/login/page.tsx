"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { loginUser } from "@/utils/actions/loginUser";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

export type LoginUser = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginUser>({
    email: "",
    password: "",
  });

  // router function for navigate

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);

      if (res.accessToken) {
        toast.success("Login Successful");

        // saving user info to localStorage
        localStorage.setItem("accessToken", res.accessToken);
        router.push("/");
      } else {
        toast.error(res.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        toast.error("An error occurred while logging in");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signIn("google", {
        callbackUrl: `http://localhost:3000/login`,
      });

      if (result?.error) {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during Google login");
      console.log(error);
    }
  };

  return (
    <div className="my-10">
      <h1 className="text-center text-4xl font-bold mb-5">
        Login <span className="text-teal-500">Here</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
            width={500}
            height={200}
            alt="login page"
            className="w-full h-[85%] object-cover"
          />
        </div>

        <div className="w-[80%] mx-auto bg-white p-6 shadow-lg rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full border border-teal-500 text-teal-500 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-teal-500 hover:text-black"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center">
            <button
              onClick={handleGoogleLogin}
              className="border p-2 hover:cursor-pointer"
            >
              <FaGoogle className="text-2xl" />
            </button>
          </div>
          <p className="text-center text-gray-600">
            Do not have an account?
            <Link className="text-teal-500 hover:underline" href="/register">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
