// src/hooks/useCreatePostForm.js
import { useState } from "react";

export function useCreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategoryId("");
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    categoryId,
    setCategoryId,
    resetForm,
  };
}
