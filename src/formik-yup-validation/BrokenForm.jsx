import React from "react";

export const BrokenForm = () => {
  return (
    <form className="border border-black p-4 rounded max-w-md mx-auto flex flex-col gap-4">
      <input
        type="text"
        placeholder="Username"
        className="border border-black p-2 rounded"
      />
      <button
        type="submit"
        className="bg-black text-white p-2 rounded hover:bg-gray-800 cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
};
