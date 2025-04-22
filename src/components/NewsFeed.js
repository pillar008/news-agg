import React from "react";
import NewsCard from "./NewsCard";
import "../styles/homepage.css";

function NewsFeed({
  articles,
  loading,
  bookmarks,
  onBookmark,
  onShare,
  onViewArticle,
  darkMode,
}) {
  return loading ? (
    <div className="loading-indicator">
      <div className="spinner" />
      Loading...
    </div>
  ) : articles.length === 0 ? (
    <div className="no-results-message">
      <p>No articles found. Try a different search term.</p>
    </div>
  ) : (
    <div className="cards-container">
      {articles.map((article, i) => (
        <NewsCard
          key={article.id || i}
          article={article}
          isBookmarked={bookmarks.some((b) => b.id === article.id)}
          onBookmark={onBookmark}
          onShare={onShare}
          onViewArticle={onViewArticle}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
}

export default NewsFeed;