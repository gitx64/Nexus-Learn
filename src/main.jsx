import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { ThemeProvider } from "./hooks/ThemeContext.jsx";

if (process.env.NODE_ENV === "production") disableReactDevTools();

// Initialize theme before rendering to prevent flash
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");
  
  document.documentElement.classList.add(theme);
  
  // Add no-transition class temporarily to prevent transition on load
  document.documentElement.classList.add("no-transition");
  
  // Remove no-transition after a brief delay
  setTimeout(() => {
    document.documentElement.classList.remove("no-transition");
  }, 100);
};

// Initialize theme immediately
initializeTheme();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);