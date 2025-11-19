import { useState } from "react";
import DashboardContext from "./DashboardContext";

// ✅ Named export
export const DashboardProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const value = { posts, setPosts, categories, setCategories };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;