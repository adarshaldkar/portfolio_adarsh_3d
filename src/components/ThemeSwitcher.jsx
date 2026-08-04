import React from "react";
import { useTheme, THEMES } from "../context/ThemeContext";

const ThemeSwitcher = () => {
  const { currentTheme, setCurrentTheme } = useTheme();

  return (
    <div className="fixed bottom-6 left-6 z-40 bg-[#0f1424]/80 backdrop-blur-md border border-[#ffffff15] p-1.5 rounded-full shadow-2xl flex items-center gap-1.5">
      {Object.keys(THEMES).map((key) => {
        const theme = THEMES[key];
        const isActive = currentTheme === key;

        return (
          <button
            key={key}
            onClick={() => setCurrentTheme(key)}
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 ${
              isActive
                ? "bg-[#ffffff15] text-white shadow-sm border border-[#ffffff20]"
                : "text-secondary hover:text-white"
            }`}
            title={`Switch to ${theme.name}`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: theme.primary }}
            />
            <span className="hidden sm:inline">{theme.name.split(" ")[0]}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
