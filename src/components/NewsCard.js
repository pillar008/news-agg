import React from "react";
import "../styles/homepage.css";

function NewsCard({ article }) {
  return (
    <div className="card" onClick={() => window.open(article.url, "_blank")}>
      <div className="card-header">
        <img src={article.urlToImage} alt="news" className="card-img-top" />
      </div>
      <div className="card-body">
        <h3 className="card-title">{article.title}</h3>
        <p className="card-text">{article.description}</p>
      </div>
    </div>
  );
}

export default NewsCard;
