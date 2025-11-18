import { useState, useContext, useEffect } from "react";
import Posts from "./Posts";
import Categories from "./Categories";
import { DashboardProvider } from "../context/DashboardContext";
import { useBlogsApi } from "../services/api";

export default function DashboardContent() {
  const { setPosts, setCategories } = useContext(DashboardProvider);
  const [activeTab, setActiveTab] = useState("posts");
  const { posts: postsApi, categories: categoriesApi } = useBlogsApi();

  useEffect(() => {
    // Fetch posts
    const fetchPosts = async () => {
      const data = await postsApi.getAll();
      setPosts(data);
    };

    // Fetch categories
    const fetchCategories = async () => {
      const data = await categoriesApi.getAll();
      setCategories(data);
    };

    fetchPosts();
    fetchCategories();
  }, [postsApi, categoriesApi, setPosts, setCategories]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "posts" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "categories"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </button>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "posts" && <Posts />}
        {activeTab === "categories" && <Categories />}
      </div>
    </div>
  );
}
