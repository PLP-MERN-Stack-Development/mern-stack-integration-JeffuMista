// src/hooks/usePostForm.js
import { useState } from "react";

export function usePostForm(initialData) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [categoryId, setCategoryId] = useState(initialData?.category?._id || "");

  const resetForm = (data) => {
    setTitle(data?.title || "");
    setContent(data?.content || "");
    setCategoryId(data?.category?._id || "");
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
