// DashboardSidebar.jsx
export default function DashboardSidebar({ activeTab, setActiveTab, openModal }) {
  return (
    <div className="w-64 bg-gray-100 min-h-screen p-4 flex flex-col gap-2">
      <button
        className={`px-4 py-2 rounded ${activeTab === "dashboard" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        onClick={() => setActiveTab("dashboard")}
      >
        Dashboard
      </button>

      <button
        className={`px-4 py-2 rounded ${activeTab === "posts" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        onClick={() => setActiveTab("posts")}
      >
        Posts
      </button>
      <button
        className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        onClick={() => openModal("createPost")}
      >
        + New Post
      </button>

      <button
        className={`px-4 py-2 rounded ${activeTab === "categories" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        onClick={() => setActiveTab("categories")}
      >
        Categories
      </button>
      <button
        className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        onClick={() => openModal("createCategory")}
      >
        + New Category
      </button>
    </div>
  );
}
