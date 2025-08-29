// src/App.jsx
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [page, setPage] = useState("home");
  const[mode, setMode] = useState("light")

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
          <button
            className={`nav-link ${page === "home" ? "active" : ""}`}
            onClick={() => setPage("home")}
          >
            Home
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${page === "favourites" ? "active" : ""}`}
            onClick={() => setPage("favourites")}
          >
            Favourites
          </button>
        </li>
      </ul>

      {page === "home" && <Home mode={mode} />}
      {page === "favourites" && <Favourites mode={mode} />}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}
