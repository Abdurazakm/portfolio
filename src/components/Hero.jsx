import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="hero shell">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="blue-dot" /> ABDURAZAK MOHAMMED · FULL-STACK
          DEVELOPER
        </p>
        <h1>
          Thoughtful code.
          <br />
          Useful <span>products.</span>
        </h1>
        <p className="hero-description">
          I build web applications that solve everyday problems — from the
          interface people see to the systems behind it.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">
            Explore my work <ArrowDown size={17} />
          </a>
          <a
            className="button secondary"
            href="https://drive.google.com/file/d/1QldGnWmEQ7_HezVMe-EjICNkG4sOXQIC/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            View résumé <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="hero-socials">
          <a
            href="https://github.com/Abdurazakm"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} /> GitHub <ArrowUpRight size={13} />
          </a>
          <a
            href="https://www.linkedin.com/in/abdurazak-mohammed-a437b62b6/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={17} /> LinkedIn <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <div className="portrait-composition">
        <div className="portrait-frame">
          <img
            src="/abdurazak.png"
            alt="Abdurazak Mohammed"
            width="560"
            height="640"
            fetchPriority="high"
          />
          <span className="portrait-index">01 / THE DEVELOPER</span>
        </div>
        <div className="portrait-caption">
          <span>
            <MapPin size={14} /> Hawassa, Ethiopia
          </span>
          <span>
            Building with purpose <span className="blue-dot" />
          </span>
        </div>
      </div>
      <div className="hero-footnote">
        <span>
          WEB APPLICATIONS <span>/</span> BACKEND SYSTEMS <span>/</span>{" "}
          REAL-WORLD IDEAS
        </span>
        <a href="#projects">
          SELECTED WORK <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
