import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useHydrated } from "../useHydrated";
export function Footer({ networkPaused, onToggleNetwork, homeHref = "#home" }) {
  const hydrated = useHydrated();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const year = hydrated ? new Date().getFullYear() : import.meta.env.VITE_BUILD_YEAR;

  useEffect(() => {
    const updateVisibility = () => setShowBackToTop(window.scrollY > 400);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <footer className="shell footer">
      <a href={homeHref} className="brand" aria-label="Abdurazak Mohammed, home">
        am<span>.</span>
      </a>
      <p>© {year} Abdurazak Mohammed</p>
      <span>Made with care. Built with React.</span>
      <button className="motion-toggle" type="button" onClick={onToggleNetwork}>
        {networkPaused ? "Resume background motion" : "Pause background motion"}
      </button>
      <a
        className={`back-top${showBackToTop ? " is-visible" : ""}`}
        href="#home"
        aria-label="Back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        title="Back to top"
      >
        <span className="back-top-label">Back to top</span>
        <ArrowUp size={19} aria-hidden="true" />
      </a>
    </footer>
  );
}
