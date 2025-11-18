import { useState } from "react";
import { categoryService } from "../services/api";
import { useDashboard } from "../context/DashboardContext";

export default function CreateCategoryModal({ open, setOpen }) {
  const { fetchCategories } = useDashboard();
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await categoryService.createCategory({ name });
      fetchCategories(); // Refresh context
      setOpen(false);
      setName("");
    } catch (err) {
      console.error("Failed to create category:", err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-1/3">
        <h2 className="text-xl font-bold mb-4">Create Category</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
