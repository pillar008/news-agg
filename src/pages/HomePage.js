import React, { useEffect, useState } from "react";
import "../../styles/style.css";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("india");
  const [loading, setLoading] = useState(false);

  const fetchNews = async (q) => {
    try {
      setLoading(true);
      const res = await fetch(`https://newsapi.org/v2/everything?q=${q}&apiKey=b39f722083d64208a047a5d2af06724e`);
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

  return (
    <div>
      <nav className="main-nav">
        <h1>NEWS</h1>
        <div className="search-bar">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="news-input" placeholder="Search..." />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>
      <main>
        {loading ? (
          <div className="loading-indicator"><div className="spinner" />Loading...</div>
        ) : (
          <div className="cards-container">
            {articles.map((article, i) => (
              <div key={i} className="card" onClick={() => window.open(article.url, '_blank')}>
                <div className="card-header"><img src={article.urlToImage} alt="news" /></div>
                <div className="card-content">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
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
