import React, { useEffect, useState } from "react";

const DateTimeDisplay = () => {
  const [now, setNow] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Detect theme from either localStorage or body class
  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem("theme");
      const bodyHasDark = document.body.classList.contains("dark");

      setIsDarkMode(storedTheme === "dark" || bodyHasDark);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("storage", checkTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", checkTheme);
    };
  }, []);

  const formattedDate = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div
      style={{
        fontSize: "0.85rem",
        fontWeight: 500,
        color: isDarkMode ? "#eee" : "#333",
        transition: "color 0.3s ease",
      }}
    >
      🗓️ {formattedDate} | 🕒 {formattedTime}
    </div>
  );
};

export default DateTimeDisplay;
