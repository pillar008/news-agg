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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } px-4`}
    >
      <a className="navbar-brand" href="/">
        <h1>NEWS</h1>
      </a>

      <div className="collapse navbar-collapse justify-content-end">
        <div className="search-logout-form d-flex gap-2 align-items-center flex-wrap">
          <input
            className="form-control"
            type="search"
            placeholder="e.g. Science"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn btn-outline-primary btn1"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className={`btn btn2 ${
              isBookmarksActive ? "btn-success" : "btn-outline-info"
            }`}
            onClick={handleBookmarksClick}
          >
            Bookmarks
          </button>

          {/* Weather Component placed here */}
          <Weather />

          <button
            className="btn btn4 btn-outline-warning d-flex align-items-center gap-1"
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
          <button
            className="btn btn5 btn-outline-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
