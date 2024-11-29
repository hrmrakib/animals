"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import axios from "axios";
import toast from "react-hot-toast";

interface uploadModalProps {
  openUploadModal: boolean;
  toggleUpload: () => void;
}

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOISTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const categories = ["Land Animal", "Bird", "Fish", "Insect"];

const AddAnimalForm = ({ openUploadModal, toggleUpload }: uploadModalProps) => {
  const [animalName, setAnimalName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [preventDoubleClick, setPreventDoubleClick] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const axiosPublic = useAxiosPublic();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image!");
      return;
    }

    try {
      setPreventDoubleClick(true);
      // Convert image to Base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result?.toString().split(",")[1]; // Extract base64 string

        if (!base64Image) {
          alert("Error reading the image file.");
          return;
        }

        const formData = new FormData();
        formData.append("key", image_hosting_key!);
        formData.append("image", base64Image);

        // Upload image to imgbb
        const res = await axios.post(image_hosting_api, formData);

        console.log(res.data);
        if (res.data.success) {
          const imageUrl = res.data.data.display_url;

          // Save animal data (name and image URL) to the database
          const newAnimal = {
            name: animalName,
            category: category,
            image: imageUrl,
          };

          const animal = await axiosPublic.post("/api/upload", newAnimal);

          if (animal?.data?.receivedData?.insertedId) {
            toast.success(`New ${animalName} added successfully!`);
            setAnimalName("");
            setImageFile(null);
            setImagePreview(null);
            setPreventDoubleClick(false);
            toggleUpload();
          }
        } else {
          alert("Failed to upload the image.");
        }
      };

      reader.readAsDataURL(imageFile);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image.");
    }
  };

  return openUploadModal ? (
    // <div className='fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50'>
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-96 mx-auto bg-white rounded-3xl p-8 shadow-xl'>
        <h2 className='text-xl text-black font-semibold mb-6'>Add Animal</h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <input
              type='text'
              placeholder='Animal Name'
              value={animalName}
              onChange={(e) => setAnimalName(e.target.value)}
              className='w-full px-4 py-3 rounded-lg bg-gray-100 text-black placeholder:text-black border-0 focus:ring-2 focus:ring-black'
              required
            />
          </div>

          <div className='relative'>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full px-4 py-3 rounded-lg bg-gray-100 text-black border-0 focus:ring-2 focus:ring-black appearance-none'
              required
            >
              <option value='' disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between mb-2 px-4 py-3 rounded-lg bg-gray-100 text-black'>
              <span className='text-gray-700'>Image</span>
              <button
                type='button'
                onClick={() => fileInputRef.current?.click()}
                className='px-4 py-1 text-sm rounded-md bg-gray-300 hover:bg-gray-400 transition-colors'
              >
                upload
              </button>
            </div>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='hidden'
            />
            {imagePreview && (
              <div className='mt-2 relative h-40 rounded-lg overflow-hidden'>
                <Image
                  width={400}
                  height={300}
                  src={imagePreview}
                  alt='Preview'
                  fill
                  className='object-cover'
                />
              </div>
            )}
          </div>

          <button
            type='submit'
            className={`${
              preventDoubleClick ? "cursor-not-allowed" : "cursor-pointer"
            } w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors`}
          >
            {preventDoubleClick ? "Wait ...." : "Create Animal"}
          </button>
        </form>

        <div
          onClick={() => toggleUpload()}
          className='absolute right-3 top-3 cursor-pointer'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-gray-800'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddAnimalForm;
