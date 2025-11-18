// src/hooks/useCategoryForm.js
import { useState } from "react";

export function useCategoryForm(initialData) {
  const [name, setName] = useState(initialData?.name || "");

  const resetForm = (data) => {
    setName(data?.name || "");
  };

  return {
    name,
    setName,
    resetForm,
  };
}
