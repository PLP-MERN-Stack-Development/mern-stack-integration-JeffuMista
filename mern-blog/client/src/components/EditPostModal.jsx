import { useState, useEffect } from "react";
import { blogsApi } from "../services/api";

export default function EditPostModal({ post, onClose }) {
  const { postService } = blogsApi();

  // Lazy state initialization
  const [title, setTitle] = useState(() => post?.title || "");
  const [content, setContent] = useState(() => post?.content || "");

  useEffect(() => {
    // Only update state if post changes
    if (!post) return;

    const updateState = () => {
      setTitle(post.title);
      setContent(post.content);
    };

    updateState();
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postService.updatePost(post._id, { title, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h3 className="text-xl font-bold mb-4">Edit Post</h3>
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
          className="w-full mb-4 p-2 border rounded"
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
