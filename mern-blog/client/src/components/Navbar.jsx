import { Link } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          My Blog
        </Link>

        <div className="space-x-4 flex items-center">
          {!isSignedIn && (
            <>
              <Link
                to="/sign-in"
                className="px-4 py-2 text-gray-700 font-semibold rounded hover:bg-gray-100 transition"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {isSignedIn && (
            <>
              <span className="text-gray-700 font-medium mr-3">
                {user?.firstName || "User"}
              </span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
