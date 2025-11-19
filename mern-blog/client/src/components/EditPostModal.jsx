import { useState, useEffect, useContext } from "react";
import { useBlogsApi } from "../services/api";
import DashboardContext from "../context/DashboardContext"; // ✅ correct import

export default function EditPostModal({ post, onClose }) {
  const { posts, setPosts } = useContext(DashboardContext);
  const { posts: postsApi } = useBlogsApi();
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedPost = await postsApi.update(post._id, { title, content });
      setPosts(posts.map((p) => (p._id === post._id ? updatedPost : p)));
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <form
        className="bg-white p-6 rounded shadow-md w-96 transform transition-transform scale-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Edit Post</h2>
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
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
