import React from "react";

function Sidebar({ handleCategoryClick }) {
  const categories = [
    "Business",
    "Technology",
    "Sports",
    "Health",
    "Entertainment",
    "Science",
    "Politics",
  ];

  return (
    <div className="sidebar">
      {categories.map((category) => (
        <button
          key={category}
          className="sidebar-btn"
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
