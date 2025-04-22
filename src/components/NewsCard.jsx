import React from "react";
import { Bookmark, Share2 } from "lucide-react";
import "../styles/homepage.css";

function NewsCard({
  article,
  isBookmarked,
  onBookmark,
  onShare,
  onViewArticle,
  darkMode,
}) {
  const handleCardClick = (e) => {
    if (e.target.closest(".bookmark-btn") || e.target.closest(".share-btn"))
      return;
    onViewArticle(article);
  };

  return (
    <div
      className={`card news-card shadow-sm ${
        darkMode ? "bg-dark text-light" : "bg-white text-dark"
      }`}
      onClick={handleCardClick}
      style={{ borderRadius: "12px", overflow: "hidden", cursor: "pointer" }}
    >
      <div
        className="card-header p-0"
        style={{ height: "200px", overflow: "hidden" }}
      >
        <img
          src={article.urlToImage || "/placeholder-image.jpg"}
          alt="news"
          className="w-100 h-100 object-fit-cover"
        />
        <div className="bookmark-share-container d-flex gap-2 position-absolute top-0 end-0 m-2">
          <button
            onClick={() => onBookmark(article.id)}
            className={` bookmark-btn btn rounded-circle p-2 bookmark-btn ${
              isBookmarked ? "btn-warning" : "btn-outline-light"
            }`}
            title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
          >
            <Bookmark size={18} />
          </button>
          <button
            onClick={() => onShare(article)}
            className="share-btn btn btn-outline-light rounded-circle p-2 share-btn"
            title="Share Article"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text">
          {article.description?.substring(0, 120) ||
            "No description available..."}
        </p>
        <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
          {article.source?.name || "Unknown Source"} •{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default NewsCard;
