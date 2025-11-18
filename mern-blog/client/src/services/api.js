// src/services/useBlogsApi.js
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export const useBlogsApi = () => {
  const { getToken } = useAuth();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    headers: { "Content-Type": "application/json" },
  });

  // Attach token to each request
  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) console.error("Unauthorized");
      return Promise.reject(err);
    }
  );

  // Posts
  const posts = {
    getAll: (page = 1, limit = 10, category = null) => {
      let url = `/posts?page=${page}&limit=${limit}`;
      if (category) url += `&category=${category}`;
      return api.get(url).then((res) => res.data);
    },
    getOne: (id) => api.get(`/posts/${id}`).then((res) => res.data),
    create: (data) => api.post("/posts", data).then((res) => res.data),
    update: (id, data) => api.put(`/posts/${id}`, data).then((res) => res.data),
    delete: (id) => api.delete(`/posts/${id}`).then((res) => res.data),
  };

  // Categories
  const categories = {
    getAll: () => api.get("/categories").then((res) => res.data),
    create: (data) => api.post("/categories", data).then((res) => res.data),
    update: (id, data) =>
      api.put(`/categories/${id}`, data).then((res) => res.data),
    delete: (id) => api.delete(`/categories/${id}`).then((res) => res.data),
  };

  // Auth
  const auth = {
    getProfile: () => api.get("/auth/profile").then((res) => res.data),
  };

  return { posts, categories, auth };
};
