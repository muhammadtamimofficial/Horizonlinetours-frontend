"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { registerUser } from "@/utils/actions/registerUser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createUser } from "@/utils/actions/createUser";
import { User } from "@/types/userType";

export type AuthUser = {
  username: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [formData, setFormData] = useState<AuthUser>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await registerUser(formData);
      console.log(res);
      if (res.success) {
        // Creating user object with default image and role if not provided
        const newUser: User = {
          username: formData.username,
          email: formData.email,
          image: "https://via.placeholder.com/150",
        };

        const userRes = await createUser(newUser);
        console.log("user res", userRes);
        toast.success("Registration successful");
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        toast.error("An error occurred while registering");
      }
    }
  };

  return (
    <div className="my-10">
      <h1 className="text-center text-4xl font-bold mb-5">
        Register <span className="text-teal-500">Now</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src="https://img.freepik.com/premium-vector/online-registration-illustration-design-concept-websites-landing-pages-other_108061-938.jpg?semt=ais_hybrid"
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
                Full Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded "
                required
              />
            </div>

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
                className="w-full p-3 border border-gray-300 rounded "
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
                className="w-full p-3 border border-gray-300 rounded "
                required
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full border border-teal-500 text-teal-500 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-teal-500 hover:text-black"
              >
                Register
              </button>
            </div>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link className="text-teal-500 hover:underline" href="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
