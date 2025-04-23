// Navbar.js
import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Weather from "./Weather"; // Import the Weather component
import "../styles/homepage.css"; // Existing CSS file for general styling

function Navbar({
  query,
  setQuery,
  handleSearch,
  handleLogout,
  onShowBookmarks,
  darkMode,
  toggleDarkMode,
}) {
  const [isBookmarksActive, setIsBookmarksActive] = useState(false);

  const handleBookmarksClick = () => {
    setIsBookmarksActive(!isBookmarksActive);
    onShowBookmarks();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a className="navbar-brand" href="/">
        <h1>NEWS</h1>
      </a>

      <div className="collapse navbar-collapse justify-content-end">
        <div className="search-logout-form d-flex gap-2 align-items-center">
          <input
            className="form-control"
            type="search"
            placeholder="e.g. Science"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-outline-primary" onClick={handleSearch}>
            Search
          </button>
          <button
            className={`btn ${isBookmarksActive ? "btn-success" : "btn-outline-info"}`}
            onClick={handleBookmarksClick}
          >
            Bookmarks
          </button>

          {/* Weather Component placed here */}
          <Weather />

          <button
            className="btn btn-outline-warning d-flex align-items-center gap-1"
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <>
                <FaSun className="icon-pulse" />
                <span className="d-none d-md-inline">Light</span>
              </>
            ) : (
              <>
                <FaMoon className="icon-float" />
                <span className="d-none d-md-inline">Dark</span>
              </>
            )}
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;