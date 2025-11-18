import { useContext, useState, useEffect } from "react";
import { DashboardProvider } from "../context/DashboardProvider";
import CreatePostModal from "../components/CreatePostModal";
import { useBlogsApi } from "../services/api";

export default function Posts() {
  const { posts, setPosts } = useContext(DashboardProvider);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { posts: postsApi } = useBlogsApi();

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await postsApi.getAll();
      setPosts(data);
    };
    fetchPosts();
  }, [postsApi, setPosts]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
      >
        Create Post
      </button>

      {isModalOpen && <CreatePostModal onClose={() => setIsModalOpen(false)} />}

      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post._id} className="p-2 border rounded">
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-gray-600">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
