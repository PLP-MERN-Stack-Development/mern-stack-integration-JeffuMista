import { useState, useEffect } from "react";
import { useBlogsApi } from "../services/useBlogsApi";

export default function EditCategoryModal({ category, onClose }) {
  const [name, setName] = useState("");
  const { categories: categoriesApi } = useBlogsApi();

  useEffect(() => {
    if (!category) return;
    const timer = setTimeout(() => {
      setName(category.name);
    }, 0);
    return () => clearTimeout(timer);
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await categoriesApi.update(category._id, { name });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Edit Category</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="w-full mb-2 p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded mr-2">
          Update
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
