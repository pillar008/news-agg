import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import NewsFeed from "./NewsFeed";
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
    <div className="homepage-container">
      <Navbar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        handleLogout={handleLogout}
      />
      <div className="main-content">
        <Sidebar handleCategoryClick={handleCategoryClick} />
        <div className="news-feed-wrapper">
          <NewsFeed articles={articles} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
