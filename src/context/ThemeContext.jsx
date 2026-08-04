import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const THEMES = {
  violet: {
    name: "Violet Nebula",
    primary: "#915EFF",
    secondary: "#6d28d9",
    accent: "#bf61ff",
    blobs: [
      "radial-gradient(circle, #915EFF55 0%, #6d28d933 50%, transparent 70%)",
      "radial-gradient(circle, #bf61ff44 0%, #4c1d9533 50%, transparent 70%)",
      "radial-gradient(circle, #bf61ff33 0%, #915EFF22 50%, transparent 70%)",
      "radial-gradient(circle, #4f46e522 0%, #7c3aed1a 50%, transparent 70%)",
    ],
  },
  emerald: {
    name: "Emerald Matrix",
    primary: "#00cea8",
    secondary: "#059669",
    accent: "#10b981",
    blobs: [
      "radial-gradient(circle, #00cea855 0%, #05966933 50%, transparent 70%)",
      "radial-gradient(circle, #34d39944 0%, #064e3b33 50%, transparent 70%)",
      "radial-gradient(circle, #10b98133 0%, #00cea822 50%, transparent 70%)",
      "radial-gradient(circle, #065f4622 0%, #0478571a 50%, transparent 70%)",
    ],
  },
  cyberpunk: {
    name: "Cyberpunk Cyan",
    primary: "#06b6d4",
    secondary: "#2563eb",
    accent: "#3b82f6",
    blobs: [
      "radial-gradient(circle, #06b6d455 0%, #2563eb33 50%, transparent 70%)",
      "radial-gradient(circle, #60a5fa44 0%, #1e3a8a33 50%, transparent 70%)",
      "radial-gradient(circle, #3b82f633 0%, #06b6d422 50%, transparent 70%)",
      "radial-gradient(circle, #1e40af22 0%, #1d4ed81a 50%, transparent 70%)",
    ],
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("violet");

  useEffect(() => {
    const theme = THEMES[currentTheme];
    const root = document.documentElement;
    root.style.setProperty("--theme-primary", theme.primary);
    root.style.setProperty("--theme-secondary", theme.secondary);
    root.style.setProperty("--theme-accent", theme.accent);
    root.style.setProperty("--aurora-blob-1", theme.blobs[0]);
    root.style.setProperty("--aurora-blob-2", theme.blobs[1]);
    root.style.setProperty("--aurora-blob-3", theme.blobs[2]);
    root.style.setProperty("--aurora-blob-4", theme.blobs[3]);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themeData: THEMES[currentTheme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

