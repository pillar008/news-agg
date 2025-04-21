import React from "react";
import "../styles/homepage.css";

function Navbar({ query, setQuery, handleSearch, handleLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a className="navbar-brand" href="/">
        <h1>NEWS</h1>
      </a>

      <div className="collapse navbar-collapse justify-content-end">
        {/* Horizontal Form */}
        <div className="search-logout-form">
          <input
            className="form-control me-2"
            type="search"
            placeholder="e.g. Science"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="btn btn-outline-primary me-2"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="btn btn-outline-danger"
            type="button"
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
