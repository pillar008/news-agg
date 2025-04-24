import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import NewsFeed from "./NewsFeed";
import ArticlePage from "./ArticlePage";
import "../styles/homepage.css";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Add dark mode class to body when darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const fetchNews = async (q) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${q}&apiKey=ad3f7c8c84a44e76915c0039cf991cdc`
      );
      const data = await res.json();

      // Make sure the response has articles and map them with unique IDs
      if (data.articles && Array.isArray(data.articles)) {
        setArticles(
          data.articles.map((a, i) => ({ ...a, id: i + "_" + Date.now() }))
        );
      } else {
        // Handle case where no articles are returned
        setArticles([]);
        console.error("No articles returned from API", data);
      }
    } catch (err) {
      console.error("Failed to load news:", err);
      alert("Failed to load news.");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) window.location.href = "/login";
    fetchNews(query);
    const saved = JSON.parse(localStorage.getItem("bookmarkedArticles")) || [];
    setBookmarks(saved);
  }, [query]);

  const handleBookmark = (id) => {
    // Find article in either the articles array or bookmarks array
    const article =
      articles.find((a) => a.id === id) || bookmarks.find((b) => b.id === id);

    if (!article) return;

    const isBookmarked = bookmarks.some((b) => b.id === id);
    let updatedBookmarks;

    if (isBookmarked) {
      updatedBookmarks = bookmarks.filter((b) => b.id !== id);
    } else {
      updatedBookmarks = [...bookmarks, article];
    }

    setBookmarks(updatedBookmarks);
    localStorage.setItem(
      "bookmarkedArticles",
      JSON.stringify(updatedBookmarks)
    );
  };

  const handleShare = (article) => {
    try {
      if (navigator.share) {
        // Native sharing on supported devices
        navigator.share({
          title: article.title,
          text: article.description,
          url: article.url,
        });
      } else {
        // Fallback to clipboard
        navigator.clipboard
          .writeText(article.url)
          .then(() => {
            alert("Article URL copied to clipboard!");
          })
          .catch((err) => {
            console.error("Could not copy URL: ", err);
            alert("Failed to copy URL.");
          });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Failed to share article.");
    }
  };

  const handleSearch = () => {
    if (query.trim()) fetchNews(query);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  const handleCategoryClick = (category) => {
    setQuery(category);
    setShowBookmarks(false);
    fetchNews(category);
  };

  const handleShowBookmarks = () => {
    setShowBookmarks(true);
  };

  const handleViewArticle = (article) => {
    setSelectedArticle(article);
  };

  const handleBackFromArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <div className={`homepage-container ${darkMode ? "dark-mode" : ""}`}>
      <Navbar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        handleLogout={handleLogout}
        onShowBookmarks={handleShowBookmarks}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="main-content">
        {!selectedArticle ? (
          <>
            <Sidebar
              handleCategoryClick={handleCategoryClick}
              darkMode={darkMode}
            />
            <div className="news-feed-wrapper">
              <NewsFeed
                articles={showBookmarks ? bookmarks : articles}
                loading={loading}
                bookmarks={bookmarks}
                onBookmark={handleBookmark}
                onShare={handleShare}
                onViewArticle={handleViewArticle}
                darkMode={darkMode}
              />
            </div>
          </>
        ) : (
          <div className="article-page-container">
            <ArticlePage
              article={selectedArticle}
              isBookmarked={bookmarks.some((b) => b.id === selectedArticle.id)}
              onBookmark={handleBookmark}
              onShare={handleShare}
              onBack={handleBackFromArticle}
              darkMode={darkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
