import React, { useEffect } from "react";

const TranslateBtn = () => {
  const scriptId = "google-translate-script";

  useEffect(() => {
    // Only add script if it isn't already present
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "text/javascript";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"; // Use HTTPS
      document.body.appendChild(script);
    }

    // Google Translate Element initialization callback
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: "white",
        padding: "5px",
        borderRadius: "5px",
      }}
    ></div>
  );
};

export default TranslateBtn;
