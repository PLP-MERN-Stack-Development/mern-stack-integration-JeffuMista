// src/hooks/useCreateCategoryForm.js
import { useState } from "react";

export function useCreateCategoryForm() {
  const [name, setName] = useState("");

  const resetForm = () => setName("");

  return {
    name,
    setName,
    resetForm,
  };
}
