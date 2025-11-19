import { useState, useContext } from "react";
import { useBlogsApi } from "../services/api";
import DashboardContext from "../context/DashboardContext"; // ✅ correct import

export default function CreatePostModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { posts, setPosts } = useContext(DashboardContext);
  const { posts: postsApi } = useBlogsApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newPost = await postsApi.create({ title, content });
      setPosts([...posts, newPost]);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
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
        <h2 className="text-xl font-bold mb-4">Create Post</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
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
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
