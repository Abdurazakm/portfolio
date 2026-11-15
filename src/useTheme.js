import { useEffect, useRef, useState } from "react";

function readPreference() {
  try {
    const saved = localStorage.getItem("portfolio-theme");
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");
  const preference = useRef(readPreference());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]').content =
      theme === "light" ? "#f7f9fc" : "#101113";
  }, [theme]);

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const followSystem = () => {
      if (!preference.current) setTheme(media.matches ? "dark" : "light");
    };
    const syncTabs = (event) => {
      if (event.key !== "portfolio-theme" && event.key !== null) return;
      preference.current = readPreference();
      setTheme(preference.current || (media.matches ? "dark" : "light"));
    };
    media.addEventListener("change", followSystem);
    window.addEventListener("storage", syncTabs);
    return () => {
      media.removeEventListener("change", followSystem);
      window.removeEventListener("storage", syncTabs);
    };
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    preference.current = next;
    setTheme(next);
    try { localStorage.setItem("portfolio-theme", next); } catch { /* Still works in memory. */ }
  }

  return { theme, toggleTheme };
}
