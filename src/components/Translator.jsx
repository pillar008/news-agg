import React, { useEffect } from "react";

function Translator() {
  useEffect(() => {
    // Define global callback function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,gu,mr,pa",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 9999,
        background: "white",
        padding: "5px",
        borderRadius: "6px",
      }}
    />
  );
}

export default Translator;
