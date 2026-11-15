import { ArrowUp } from "lucide-react";
import { useHydrated } from "../useHydrated";
export function Footer({ networkPaused, onToggleNetwork, homeHref = "#home" }) {
  const hydrated = useHydrated();
  const year = hydrated ? new Date().getFullYear() : import.meta.env.VITE_BUILD_YEAR;
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
      <a className="back-top" href="#home">
        Back to top <ArrowUp size={16} />
      </a>
    </footer>
  );
}
