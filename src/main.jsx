import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

// Scroll progress bar tracker
const updateScrollProgress = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  document.body.style.setProperty("--scroll-pct", pct.toFixed(2));
};
window.addEventListener("scroll", updateScrollProgress, { passive: true });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
