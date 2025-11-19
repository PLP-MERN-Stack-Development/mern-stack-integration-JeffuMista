# MERN Blog

A full-stack blog platform built with the **MERN stack** (MongoDB, Express, React, Node.js), integrated with **Clerk** for authentication. It provides a modern admin dashboard for managing posts and categories, using Tailwind CSS for styling and Axios for API communication.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Backend API](#backend-api)
- [Frontend](#frontend)
- [Authentication](#authentication)
- [Dashboard Features](#dashboard-features)
- [Modals](#modals)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

This project is a blog management platform. It allows authenticated users to:

- Create, edit, and delete posts
- Categorize posts
- View a dashboard of posts and categories

**Authentication** is handled via Clerk, ensuring secure access.

---

## Tech Stack

**Frontend:**

- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Context API for global state (DashboardContext)
- Clerk Authentication (`@clerk/clerk-react`)

**Backend:**

- Node.js
- Express
- MongoDB + Mongoose
- Clerk middleware for route protection
- REST API endpoints for posts and categories

---

## Folder Structure

mern-blog/
├── client/ # React front-end
│ ├── public/ # Static files
│ ├── src/
│ │ ├── components/ # Reusable UI components and modals
│ │ ├── context/ # React context (DashboardContext)
│ │ ├── hooks/ # Custom hooks (usePosts, useCategories)
│ │ ├── pages/ # Page components (Dashboard, Posts, Categories)
│ │ ├── services/ # API services & Clerk wrapper
│ │ └── App.jsx # Main application
│ └── package.json
├── server/ # Express backend
│ ├── models/ # Mongoose schemas (Post, Category)
│ ├── routes/ # Express routes (posts, categories, auth)
│ ├── middleware/ # Auth & error handling middleware
│ ├── app.js # Express app setup
│ └── server.js # Server start
└── package.json

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mern-blog.git
cd mern-blog

2. Backend setup
cd server
npm install

Start the backend server:
npm run dev

3. Frontend setup
cd ../client
npm install

Start the frontend:
npm run dev

The frontend runs on http://localhost:5173, backend on http://localhost:5000.

Environment Variables
Create a .env file in both client and server as needed.
Client .env
VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
VITE_CLERK_FRONTEND_API=https://api.clerk.dev

Server .env
MONGO_URI=your_mongodb_connection_string
PORT=5000
CLERK_API_KEY=your_clerk_api_key


Backend API

Posts API (/api/posts):
MethodEndpointDescriptionGET/postsFetch all postsGET/posts/:idOrSlugFetch single postPOST/postsCreate new postPUT/posts/:idUpdate postDELETE/posts/:idDelete postPOST/posts/:id/commentsAdd comment to a postGET/posts/search?q=querySearch posts by keyword

Categories API (/api/categories):
MethodEndpointDescriptionGET/categoriesGet all categoriesPOST/categoriesCreate a new category
Authentication API (/api/auth):
Handled via Clerk (login, registration, token validation).

Frontend


React pages:


Dashboard.jsx: Main dashboard page with posts & categories overview


Posts.jsx: List of posts


Categories.jsx: List of categories




Components:

CreatePostModal.jsx, EditPostModal.jsx

CreateCategoryModal.jsx, EditCategoryModal.jsx

Hooks:
usePosts.jsx, useCategories.jsx

Services:
api.js or blogsApi.js: Handles all backend requests

Authentication
Clerk handles all authentication:

SignedIn and SignedOut components restrict access

UserButton component displays current user info

Tokens are passed automatically to API calls using blogsApi() pattern

Dashboard Features

View all posts and categories

Create, edit, and delete posts and categories

Real-time dashboard updates using Context API

Search posts by keyword

Fully responsive UI using TailwindCSS

Modals
All modals follow a self-contained component pattern:

CreatePostModal

EditPostModal

CreateCategoryModal

EditCategoryModal

They handle form state internally and communicate changes to DashboardContext.

Troubleshooting


Clerk publishable key error: Make sure VITE_CLERK_PUBLISHABLE_KEY is set correctly in .env and re-run the frontend.


React Router errors: Ensure react-router-dom is installed and imported correctly.


PostCSS/Tailwind errors: Ensure tailwindcss and @tailwindcss/postcss are installed.


Backend errors: Check MongoDB connection string and ensure server is running on correct port.



License
MIT © jeffumista

```
