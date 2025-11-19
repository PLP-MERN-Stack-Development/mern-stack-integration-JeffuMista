import { useState, useEffect, useContext } from "react";
import { useBlogsApi } from "../services/api";
import DashboardContext from "../context/DashboardContext"; // ✅ correct import

export default function EditCategoryModal({ category, onClose }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { categories, setCategories } = useContext(DashboardContext);
  const { categories: categoriesApi } = useBlogsApi();

  useEffect(() => {
    if (category) setName(category.name);
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedCat = await categoriesApi.update(category._id, { name });
      setCategories(
        categories.map((c) => (c._id === category._id ? updatedCat : c))
      );
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 transform transition-transform scale-100"
      >
        <h2 className="text-xl font-bold mb-4">Edit Category</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
