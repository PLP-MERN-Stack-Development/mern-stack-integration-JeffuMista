import { useState, useContext, useEffect } from "react";
import DashboardContext from "../context/DashboardContext";

export default function DashboardContent({ activeView }) {
  const { posts, setPosts, categories, setCategories } = useContext(DashboardContext);
  const [activeTab, setActiveTab] = useState("posts");

  // Dummy data for testing
  useEffect(() => {
    setPosts([
      { id: 1, title: "Launch new blog feature", date: "2025-11-18", views: 120 },
      { id: 2, title: "SEO tips for 2025", date: "2025-11-17", views: 80 },
      { id: 3, title: "Understanding React Context", date: "2025-11-16", views: 95 },
    ]);

    setCategories([
      { id: 1, name: "News" },
      { id: 2, name: "Tech" },
      { id: 3, name: "Lifestyle" },
      { id: 4, name: "Tutorials" },
    ]);
  }, [setPosts, setCategories]);

  // Determine which view to show based on sidebar
  if (activeView === "dashboard") {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome to your Dashboard</h2>
        <p className="text-gray-600">Use the sidebar to manage posts and categories.</p>
      </div>
    );
  }

  if (activeView === "posts") {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-5 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-gray-50"
            >
              <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
              <p className="text-gray-500 text-sm mt-1">Date: {post.date}</p>
              <p className="text-gray-500 text-sm mt-1">Views: {post.views}</p>
              <button className="mt-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeView === "categories") {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-center font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
