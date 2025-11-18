import { useState } from "react";
import DashboardContext from "./DashboardContext";

export const DashboardProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  return (
    <DashboardContext.Provider value={{ posts, setPosts, categories, setCategories }}>
      {children}
    </DashboardContext.Provider>
  );
};
