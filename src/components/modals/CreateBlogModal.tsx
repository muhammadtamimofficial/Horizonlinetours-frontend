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
import useGetCurrentUser from "@/app/hooks/useGetCurrentUser";
import { createBlog } from "@/utils/actions/createBlog";
import { Blog } from "@/types/BlogType";
import ImageUploader from "../ImageUpload/ImageUploader";
import {
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

interface FormCreatorModalProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>;
  setBlogs: Dispatch<SetStateAction<Blog[]>>;
}

export default function CreateBlogModal({
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  setBlogs,
}: FormCreatorModalProps) {
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

  // image url

  const [imageUrl, setImageUrl] = useState<string>("");

  // image image url set

  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    setImageUrl((result.info as CloudinaryUploadWidgetInfo)?.secure_url);
  };

  // image upload button style
  const imageUploadbuttonStyle = {
    padding: "10px 20px",
    border: "1px solid gray",
    borderRadius: "5px",
    color: "black",
    cursor: "pointer",
    width: "100%",
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl) {
      return toast.error("Upload An Image");
    }
    try {
      const blogData: Blog = {
        creatorName: formData.creatorName,
        creatorEmail: formData.creatorEmail,
        creatorImage: formData.creatorImage,
        title: formData.title,
        image: imageUrl,
        description: formData.description,
        createdAt: new Date().toISOString(),
      };
      console.log(blogData);

      const response = await createBlog(blogData);

      if (response?.acknowledged === true) {
        toast.success("Blog Created Successfully");

        setFormData({
          ...formData,
          title: "",
          image: "",
          description: "",
        });

        setIsUpdateModalOpen(false);

        setBlogs((prevBlogs) => [
          { _id: response.insertedId, ...blogData },
          ...prevBlogs,
        ]);
      } else {
        toast.error("Failed to create blog");
      }
    } catch (error) {
      toast.error("An error occurred while creating the blog");
      console.error(error);
    }
  };

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
                    onClick={closeModal}
                  />
                </div>

                <DialogTitle
                  as="h3"
                  className="text-xl font-semibold text-gray-800"
                >
                  Create Form
                </DialogTitle>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        readOnly
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
                      />
                    </div>

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
                        readOnly
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
                      />
                    </div>

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
                        readOnly
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
                      />
                    </div>

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

                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="image"
                      className="text-lg font-medium text-gray-600"
                    >
                      Upload Image
                    </label>
                    <div>
                      <ImageUploader
                        onSuccess={handleUploadSuccess}
                        buttonText="Upload"
                        imageUploadbuttonStyle={imageUploadbuttonStyle}
                      />
                    </div>
                  </div>

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

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Submit Form
                  </button>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
