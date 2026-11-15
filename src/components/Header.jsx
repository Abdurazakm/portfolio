import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Moon, Pause, Play, Sun, X } from "lucide-react";

export function Header({ networkPaused, onToggleNetwork, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a
          href="#home"
          className="brand"
          aria-label="Abdurazak Mohammed, home"
          onClick={() => setOpen(false)}
        >
          am<span>.</span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="navigation"
          aria-label="Main navigation"
          className={open ? "navigation is-open" : "navigation"}
        >
          <a href="#projects" onClick={() => setOpen(false)}>
            Work
          </a>
          <a href="#about" onClick={() => setOpen(false)}>
            About
          </a>
          <a href="#experience" onClick={() => setOpen(false)}>
            Experience
          </a>
          <a
            href="#contact"
            className="nav-contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <ArrowUpRight size={16} />
          </a>
        </nav>
        <button
          type="button"
          className="theme-toggle"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          onClick={onToggleTheme}
        >
          {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </button>
        <button
          type="button"
          className="network-toggle"
          aria-label={
            networkPaused ? "Resume background animation" : "Pause background animation"
          }
          title={
            networkPaused ? "Resume background animation" : "Pause background animation"
          }
          onClick={onToggleNetwork}
        >
          {networkPaused ? (
            <Play size={16} aria-hidden="true" />
          ) : (
            <Pause size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}
