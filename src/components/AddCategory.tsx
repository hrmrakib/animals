"use client";

import { useState } from "react";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Here you would typically make an API call to save the category
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setName("");
      // You could add a success message or redirect here
    } catch (err) {
      console.log(err);
      setError("Failed to save category. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md mx-auto p-6'>
      <form
        onSubmit={handleSubmit}
        className='bg-white rounded-3xl shadow-sm p-6'
      >
        <h1 className='text-2xl font-semibold mb-6'>Add Category</h1>

        <div className='mb-6'>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
            required
            className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all'
          />
        </div>

        {error && <div className='mb-4 text-sm text-red-500'>{error}</div>}

        <button
          type='submit'
          disabled={isLoading || !name.trim()}
          className='w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
