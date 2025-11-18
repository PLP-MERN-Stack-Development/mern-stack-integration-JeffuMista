import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-1">
          <SignedIn>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </SignedIn>

          <SignedOut>
            <Routes>
              <Route path="/" element={<Navigate to="/sign-in" replace />} />
              <Route
                path="/sign-in"
                element={<SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" afterSignInUrl="/" />}
              />
              <Route
                path="/sign-in/*"
                element={<SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" afterSignInUrl="/" />}
              />
            </Routes>
          </SignedOut>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
