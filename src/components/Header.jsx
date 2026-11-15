import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, FolderCode, Menu, Moon, Sun, UserRound, X } from "lucide-react";

export function Header({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const toggle = useRef(null);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id);
      }
    }, { rootMargin: "-20% 0px -60% 0px" });
    document.querySelectorAll("main > section").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
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
          className="brand header-brand"
          aria-label="Abdurazak Mohammed, home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-monogram">am<span>.</span></span>
          <span className="brand-details">
            <strong>Abdurazak</strong>
            <small>Full-stack developer</small>
          </span>
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
          <a href="#projects" aria-current={active === "projects" ? "location" : undefined} onClick={() => setOpen(false)}>
            <FolderCode className="nav-icon" size={15} aria-hidden="true" /> Work
          </a>
          <a href="#about" aria-current={active === "about" ? "location" : undefined} onClick={() => setOpen(false)}>
            <UserRound className="nav-icon" size={15} aria-hidden="true" /> About
          </a>
          <a href="#experience" aria-current={active === "experience" ? "location" : undefined} onClick={() => setOpen(false)}>
            <BriefcaseBusiness className="nav-icon" size={15} aria-hidden="true" /> Experience
          </a>
          <a
            href="#contact"
            className="nav-contact"
            aria-current={active === "contact" ? "location" : undefined}
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
      </div>
    </header>
  );
}
