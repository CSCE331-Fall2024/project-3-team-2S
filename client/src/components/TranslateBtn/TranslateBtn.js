import React, { useEffect, useState } from "react";

const TranslateBtn = () => {
  const scriptId = "google-translate-script";
  const [isVisible, setIsVisible] = useState(false); // State to toggle visibility

  useEffect(() => {
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "text/javascript";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "20px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        aria-label="Toggle Translate"
      >
        🌐
      </button>

      {/* Google Translate Element */}
      <div
        id="google_translate_element"
        style={{
          position: "fixed",
          bottom: "80px", // Adjusted position above the toggle button
          right: "20px",
          zIndex: 1000,
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          visibility: isVisible ? "visible" : "hidden", // Toggle visibility using CSS
        }}
      ></div>
    </div>
  );
};

export default TranslateBtn;
