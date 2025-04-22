import React from "react";
import { Bookmark, Share2 } from "lucide-react";
import "../styles/homepage.css";

function NewsCard({
  article,
  isBookmarked,
  onBookmark,
  onShare,
  onViewArticle,
}) {
  const handleCardClick = (e) => {
    // Don't navigate if clicking bookmark or share buttons
    if (e.target.closest(".bookmark-btn") || e.target.closest(".share-btn")) {
      return;
    }
    // Navigate to article page
    onViewArticle(article);
  };

  return (
    <div className="card cursor-pointer" onClick={handleCardClick}>
      <div className="card-header relative">
        <img
          src={article.urlToImage || "/placeholder-image.jpg"}
          alt="news"
          className="card-img-top"
        />
        <div
          className="bookmark-share-container"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onBookmark(article.id)}
            className="bookmark-btn"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark
              className={`bookmark-icon ${isBookmarked ? "bookmarked" : ""}`}
            />
          </button>
          <button
            onClick={() => onShare(article)}
            className="share-btn"
            aria-label="Share article"
          >
            <Share2 className="share-icon" />
          </button>
        </div>
      </div>
      <div className="card-body p-4">
        <h3 className="card-title text-lg font-semibold">{article.title}</h3>
        <p className="card-text text-sm text-gray-700">
          {article.description
            ? article.description.substring(0, 100) + "..."
            : "No description available"}
        </p>
      </div>
    </div>
  );
}

export default NewsCard;
