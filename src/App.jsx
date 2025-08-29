// src/App.jsx
import { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const toggleMode = () => setMode((m) => (m === "light" ? "dark" : "light"));

  return (
    <div className="container py-4">
      {/* Header + toggle */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="m-0">MyMovieList</h1>
        <button
          className={`btn ${mode === "light" ? "btn-dark" : "btn-light"}`}
          onClick={toggleMode}
        >
          {mode === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      {/* Nav tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/favourites"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Favourites
          </NavLink>
        </li>
      </ul>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home mode={mode} />} />
        <Route path="/favourites" element={<Favourites mode={mode} />} />
      </Routes>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}
