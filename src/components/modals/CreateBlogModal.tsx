"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useGetCurrentUser from "@/app/hooks/useGetCurrentUser";
import { createBlog } from "@/utils/actions/createBlog";
import { Blog } from "@/types/BlogType";

interface FormCreatorModalProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CreateBlogModal({
  isUpdateModalOpen,
  setIsUpdateModalOpen,
}: FormCreatorModalProps) {
  // Get current user from hook
  const { currentUser } = useGetCurrentUser();
  const { username, email, image } = currentUser || {};

  const [formData, setFormData] = useState({
    creatorName: username || "",
    creatorEmail: email || "",
    creatorImage: image || "",
    title: "",
    image: "",
    description: "",
  });

  // Pre-fill form data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData((prevData) => ({
        ...prevData,
        creatorName: username || "",
        creatorEmail: email || "",
        creatorImage: image || "",
      }));
    }
  }, [currentUser, username, email, image]);

  // calling router function to refresh
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form submission functionality
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Prepare the data to be sent to the server
      const blogData: Blog = {
        creatorName: formData.creatorName,
        creatorEmail: formData.creatorEmail,
        creatorImage: formData.creatorImage,
        title: formData.title,
        image: formData.image,
        description: formData.description,
        createdAt: new Date().toISOString(),
      };
      console.log(blogData);

      // Call the createBlog function
      const response = await createBlog(blogData);

      // Check if the response is successful
      if (response?.acknowledged === true) {
        toast.success("Blog Created Successfully");

        // Reset the form data
        setFormData({
          ...formData,
          title: "",
          image: "",
          description: "",
        });

        // Refresh the page and close the modal
        router.refresh();
        setIsUpdateModalOpen(false);
      } else {
        toast.error("Failed to create blog");
      }
    } catch (error) {
      toast.error("An error occurred while creating the blog");
      console.error(error);
    }
  };

  // Modal closing function
  const closeModal = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <Transition appear show={isUpdateModalOpen}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg backdrop-blur-md">
                <div className="absolute top-4 right-4">
                  <MdCancel
                    size={30}
                    className="text-gray-600 cursor-pointer hover:text-gray-800"
                    onClick={closeModal} // Close modal on click
                  />
                </div>

                <DialogTitle
                  as="h3"
                  className="text-xl font-semibold text-gray-800"
                >
                  Create Form
                </DialogTitle>

                {/* ----------- Form starts ---------- */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Creator Name (Uneditable) */}
                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="creatorName"
                        className="text-lg font-medium text-gray-600"
                      >
                        Creator Name
                      </label>
                      <input
                        type="text"
                        id="creatorName"
                        name="creatorName"
                        value={formData.creatorName}
                        readOnly // Make the field uneditable
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
                      />
                    </div>

                    {/* Creator Email (Uneditable) */}
                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="creatorEmail"
                        className="text-lg font-medium text-gray-600"
                      >
                        Creator Email
                      </label>
                      <input
                        type="email"
                        id="creatorEmail"
                        name="creatorEmail"
                        value={formData.creatorEmail}
                        readOnly // Make the field uneditable
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
                      />
                    </div>

                    {/* Creator Image (Uneditable) */}
                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="creatorImage"
                        className="text-lg font-medium text-gray-600"
                      >
                        Creator Image URL
                      </label>
                      <input
                        type="text"
                        id="creatorImage"
                        name="creatorImage"
                        value={formData.creatorImage}
                        readOnly // Make the field uneditable
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
                      />
                    </div>

                    {/* Title (Editable) */}
                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="title"
                        className="text-lg font-medium text-gray-600"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter title"
                        required
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Image URL (Editable) */}
                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="image"
                      className="text-lg font-medium text-gray-600"
                    >
                      Image URL
                    </label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="Enter image URL"
                      required
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Description (Editable) */}
                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="description"
                      className="text-lg font-medium text-gray-600"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter description"
                      required
                      className="px-4 py-2 h-52 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Submit Form
                  </button>
                </form>
                {/*------------ Form ends -------------- */}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
