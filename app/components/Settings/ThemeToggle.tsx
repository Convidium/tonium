import React, { useEffect, useState } from "react";
import "@/app/ui/styles/ui-components/ThemeToggle.scss";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const handleToggle = () => {
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="theme-toggle">
      <span>Theme</span>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={isDark}
          onChange={handleToggle}
          aria-label="Toggle theme"
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;