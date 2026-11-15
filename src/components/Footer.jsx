import { ArrowUp } from "lucide-react";
export function Footer({ networkPaused, onToggleNetwork }) {
  return (
    <footer className="shell footer">
      <a href="#home" className="brand" aria-label="Abdurazak Mohammed, home">
        am<span>.</span>
      </a>
      <p>© {new Date().getFullYear()} Abdurazak Mohammed</p>
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
