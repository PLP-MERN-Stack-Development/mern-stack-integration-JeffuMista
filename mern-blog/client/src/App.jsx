// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <SignedIn>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </SignedIn>

      <SignedOut>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </SignedOut>
    </Router>
  );
}
