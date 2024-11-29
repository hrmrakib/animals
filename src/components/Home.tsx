"use client";

import Image from "next/image";
import { useState } from "react";
import AddAnimalForm from "./UploadAnimal";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { Toaster } from "react-hot-toast";

interface Animal {
  id: string;
  name: string;
  category: string;
  image: string;
}

const initialAnimals: Animal[] = [
  {
    id: "1",
    name: "ELEPHANT",
    category: "Land Animal",
    image: "/assets/elephant.png",
  },
  {
    id: "2",
    name: "HORSE",
    category: "Land Animal",
    image: "/assets/horse.png",
  },
  {
    id: "3",
    name: "FOX",
    category: "Land Animal",
    image: "/assets/fox.png",
  },
  {
    id: "4",
    name: "COCKATOO",
    category: "Bird",
    image: "/assets/cockatoo.png",
  },
  {
    id: "5",
    name: "PHOENIX",
    category: "Bird",
    image: "/assets/phoenix.png",
  },
  {
    id: "6",
    name: "SPARROW",
    category: "Bird",
    image: "/assets/sparrow.png",
  },
];

const categories = ["Land Animal", "Bird", "Fish", "Insect"];

const Home = () => {
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>();
  // "Land Animal"
  const [animals] = useState<Animal[]>(initialAnimals);

  // const {
  //   isPending,
  //   error,
  //   data: animalss,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["animals"],
  //   queryFn: async () => {
  //     const res = await axios.get("http://localhost:3000/api/upload");
  //     return res.data;
  //   },
  // });

  // if (isPending) {
  //   return <span>loading ....</span>;
  // }

  // console.log(animals?.data);

  const filteredAnimals = selectedCategory
    ? animals.filter((animal) => animal.category === selectedCategory)
    : animals;
  // console.log(filteredAnimals?.data);

  const toggleUpload = () => {
    setOpenUploadModal((prev) => !prev);
  };

  return (
    <div className={`relative min-h-screen bg-black p-4 md:p-8`}>
      {/* toast */}
      <Toaster position='top-center' reverseOrder={false} />

      <div className={`mx-auto max-w-7xl ${openUploadModal ? "blur-sm" : ""}`}>
        {/* Category Filters and Action Buttons */}
        <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-wrap gap-2'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors
                  ${
                    selectedCategory === category
                      ? category === "Land Animal"
                        ? "border-2 border-green-500 text-green-500"
                        : "border-2 border-red-500 text-red-500"
                      : "border-2 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className='flex gap-2'>
            <button
              onClick={toggleUpload}
              className='rounded-full border-2 border-white px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black'
            >
              Add Animal
            </button>
            <button className='rounded-full border-2 border-white px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black'>
              Add Category
            </button>
          </div>
        </div>

        {/* Animal Grid */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          {filteredAnimals?.map((animal) => (
            <div
              key={animal.id}
              className='group relative overflow-hidden bg-black p-4 transition-transform hover:scale-105'
            >
              <div className='flex h-full flex-col items-center justify-center'>
                <div className='mb-4 aspect-square w-full p-5 border border-gray-800 rounded-xl'>
                  <Image
                    width={120}
                    height={120}
                    src={animal.image}
                    alt={animal.name}
                    className='h-full w-full object-contain p-5'
                  />
                </div>
                <p className='text-center text-sm font-medium text-gray-300'>
                  {animal.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddAnimalForm
        openUploadModal={openUploadModal}
        toggleUpload={toggleUpload}
      />
    </div>
  );
};

export default Home;
