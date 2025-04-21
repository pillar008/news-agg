import React, { useEffect, useState } from "react";
import "../styles/homepage.css";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("india");
  const [loading, setLoading] = useState(false);

  const fetchNews = async (q) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${q}&apiKey=b39f722083d64208a047a5d2af06724e`
      );
      const data = await res.json();
      setArticles(data.articles);
    } catch (err) {
      alert("Failed to load news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) window.location.href = "/login";
    fetchNews(query);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  const handleSearch = () => {
    if (query.trim()) fetchNews(query);
  };

  const handleCategoryClick = (category) => {
    fetchNews(category);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand" href="/">
          <h1>NEWS</h1>
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => handleCategoryClick("cricket")}
              >
                Cricket
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => handleCategoryClick("finance")}
              >
                Finance
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => handleCategoryClick("politics")}
              >
                Politics
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => handleCategoryClick("tech")}
              >
                Tech
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => alert("Bookmarks")}
              >
                Bookmarks
              </button>
            </li>
          </ul>

          <form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="e.g. Science"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-primary me-2" type="submit">
              Search
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </form>
        </div>
      </nav>

      <main>
        {loading ? (
          <div className="loading-indicator">
            <div className="spinner" />
            Loading...
          </div>
        ) : (
          <div className="cards-container">
            {articles.map((article, i) => (
              <div
                key={i}
                className="card"
                onClick={() => window.open(article.url, "_blank")}
              >
                <div className="card-header">
                  <img
                    src={article.urlToImage}
                    alt="news"
                    className="card-img-top"
                  />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{article.title}</h3>
                  <p className="card-text">{article.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
