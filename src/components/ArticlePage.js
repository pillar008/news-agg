import React, { useState } from "react";
import { ArrowLeft, Share2, Bookmark } from "lucide-react";
import "../styles/homepage.css"; // Use existing CSS file instead of articlepage.css

function ArticlePage({ article, isBookmarked, onBookmark, onShare, onBack }) {
  const [aiSummary, setAiSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Function to generate AI summary
  const generateAISummary = async () => {
    try {
      setLoadingSummary(true);

      // This is a placeholder for actual AI summary generation
      // In a real implementation, you would call an AI service API
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      // Create a simulated AI summary based on available content
      const content = article.content || article.description || "";
      const summary = `This article discusses ${article.title
        .split(" ")
        .slice(0, 5)
        .join(" ")}... 
      It covers important developments related to this topic with implications for readers.
      ${content.split(" ").slice(0, 100).join(" ")}...
      The article provides insights into these developments and their potential consequences.`;

      setAiSummary(summary);
    } catch (error) {
      console.error("Error generating AI summary:", error);
      setAiSummary("Failed to generate AI summary. Please try again later.");
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleReadFullArticle = () => {
    window.open(article.url, "_blank");
  };

  return (
    <div className="article-page">
      <div className="article-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} /> Back
        </button>

        <div className="article-actions">
          <button
            onClick={() => onBookmark(article.id)}
            className="action-button"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark className={isBookmarked ? "bookmarked" : ""} size={20} />
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>

          <button
            onClick={() => onShare(article)}
            className="action-button"
            aria-label="Share article"
          >
            <Share2 size={20} />
            Share
          </button>
        </div>
      </div>

      <div className="article-content">
        <h1 className="article-title">{article.title}</h1>

        <div className="article-meta">
          <span className="article-source">
            {article.source?.name || "Unknown source"}
          </span>
          <span className="article-date">
            {new Date(article.publishedAt).toLocaleDateString()} •
            {new Date(article.publishedAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="article-image"
          />
        )}

        <div className="article-description">
          <h2>Overview</h2>
          <p>{article.description || "No description available."}</p>
        </div>

        <div className="article-body">
          <h2>Article Content</h2>
          <p>
            {(article.content || "No content available.").replace(
              /\[\+\d+ chars\]$/,
              ""
            )}
          </p>
        </div>

        <div className="article-buttons">
          <button className="read-more-btn" onClick={handleReadFullArticle}>
            Read Full Article
          </button>

          <button
            className={`ai-summary-btn ${loadingSummary ? "loading" : ""}`}
            onClick={generateAISummary}
            disabled={loadingSummary}
          >
            {loadingSummary ? "Generating Summary..." : "AI Summarize"}
          </button>
        </div>

        {aiSummary && (
          <div className="ai-summary-section">
            <h2>AI-Generated Summary</h2>
            <p className="ai-summary-text">{aiSummary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticlePage;
