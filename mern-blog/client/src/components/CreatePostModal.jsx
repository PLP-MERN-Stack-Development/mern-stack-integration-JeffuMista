import { useState } from "react";
import { useBlogsApi } from "../services/api";

export default function CreatePostModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { posts: postsApi } = useBlogsApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postsApi.create({ title, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Create Post</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full mb-2 p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded mr-2">
          Save
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
