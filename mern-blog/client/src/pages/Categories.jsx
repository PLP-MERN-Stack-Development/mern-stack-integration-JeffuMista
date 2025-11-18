import { useContext, useState, useEffect } from "react";
import { DashboardProvider } from "../context/DashboardContext";
import CreateCategoryModal from "../components/CreateCategoryModal";
import { useBlogsApi } from "../services/api";

export default function Categories() {
  const { categories, setCategories } = useContext(DashboardProvider);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories: categoriesApi } = useBlogsApi();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await categoriesApi.getAll();
      setCategories(data);
    };
    fetchCategories();
  }, [categoriesApi, setCategories]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
      >
        Create Category
      </button>

      {isModalOpen && (
        <CreateCategoryModal onClose={() => setIsModalOpen(false)} />
      )}

      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category._id} className="p-2 border rounded">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
