// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import { ClerkProvider } from "@clerk/clerk-react";

// read env vars
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const FRONTEND_API = import.meta.env.VITE_CLERK_FRONTEND_API; // optional

// Debug — temporary, remove after verification
console.log("VITE_CLERK_PUBLISHABLE_KEY:", !!PUBLISHABLE_KEY);
console.log("VITE_CLERK_FRONTEND_API:", !!FRONTEND_API);

if (!PUBLISHABLE_KEY && !FRONTEND_API) {
  console.error("Missing Clerk keys. Set VITE_CLERK_PUBLISHABLE_KEY or VITE_CLERK_FRONTEND_API in .env");
  // optionally throw to surface the issue during dev:
  // throw new Error("Missing Clerk publishableKey/frontendApi");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY || undefined}
      frontendApi={FRONTEND_API || undefined}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
