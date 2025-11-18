import { useState } from "react";
import { DashboardProvider } from "../context/DashboardProvider";
import DashboardContent from "./DashboardContent";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("dashboard");
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
  };

  return (
    <DashboardProvider>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md hidden md:block">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-600 mb-10">My Blog</h1>
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => setActiveView("dashboard")}
                className={`text-left px-4 py-2 rounded font-semibold transition-colors ${
                  activeView === "dashboard"
                    ? "bg-blue-50 text-blue-600 shadow"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                Dashboard
              </button>

              <button
                onClick={() => setActiveView("posts")}
                className={`text-left px-4 py-2 rounded font-semibold transition-colors ${
                  activeView === "posts"
                    ? "bg-blue-50 text-blue-600 shadow"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                Posts
              </button>

              <button
                onClick={() => setActiveView("categories")}
                className={`text-left px-4 py-2 rounded font-semibold transition-colors ${
                  activeView === "categories"
                    ? "bg-blue-50 text-blue-600 shadow"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                Categories
              </button>

              <button
                onClick={handleSignOut}
                className="text-left px-4 py-2 rounded font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <DashboardContent activeView={activeView} />
        </main>
      </div>
    </DashboardProvider>
  );
}
