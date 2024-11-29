"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface uploadModalProps {
  openUploadModal: boolean;
  toggleUpload: () => void;
}

const AddAnimalForm = ({ openUploadModal, toggleUpload }: uploadModalProps) => {
  const [animalName, setAnimalName] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Submitted:", { animalName, imagePreview });
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
            className='w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors'
          >
            Create Animal
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
