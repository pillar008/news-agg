import React from "react";
import NewsCard from "./NewsCard";
import "../styles/homepage.css";

function NewsFeed({ articles, loading }) {
  return loading ? (
    <div className="loading-indicator">
      <div className="spinner" />
      Loading...
    </div>
  ) : (
    <div className="cards-container">
      {articles.map((article, i) => (
        <NewsCard key={i} article={article} />
      ))}
    </div>
  );
}

export default NewsFeed;
