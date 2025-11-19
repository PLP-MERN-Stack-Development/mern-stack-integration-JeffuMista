import { useState, useContext } from "react";
import DashboardContext from "../context/DashboardContext";
import CreatePostModal from "../components/CreatePostModal";
import EditPostModal from "../components/EditPostModal";
import CreateCategoryModal from "../components/CreateCategoryModal";
import EditCategoryModal from "../components/EditCategoryModal";

export default function DashboardContent({ activeView }) {
  const { posts, categories } = useContext(DashboardContext);

  // Modal state
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Action buttons */}
      <div className="flex space-x-4 mb-6">
        {activeView === "posts" && (
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => setOpenCreatePost(true)}
          >
            + New Post
          </button>
        )}
        {activeView === "categories" && (
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => setOpenCreateCategory(true)}
          >
            + New Category
          </button>
        )}
      </div>

      {/* List */}
      {activeView === "posts" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="p-5 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-gray-50"
            >
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{post.content}</p>
              <div className="mt-3 flex space-x-2">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => setEditPost(post)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeView === "categories" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-center font-semibold text-blue-700 hover:bg-blue-100 cursor-pointer"
              onClick={() => setEditCategory(cat)}
            >
              {cat.name}
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {openCreatePost && <CreatePostModal onClose={() => setOpenCreatePost(false)} />}
      {editPost && <EditPostModal post={editPost} onClose={() => setEditPost(null)} />}
      {openCreateCategory && <CreateCategoryModal onClose={() => setOpenCreateCategory(false)} />}
      {editCategory && <EditCategoryModal category={editCategory} onClose={() => setEditCategory(null)} />}
    </div>
  );
}
