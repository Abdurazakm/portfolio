import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="blue-dot" /> FULL-STACK DEVELOPER · HAWASSA, ETHIOPIA
          </p>
          <p className="hero-intro">Hi, I’m <strong>Abdurazak Mohammed.</strong></p>
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
        <figure className="portrait-composition">
          <p className="portrait-label eyebrow">THE PERSON BEHIND THE CODE</p>
          <div className="portrait-frame">
            <img
              src="/abdurazak.png"
              alt="Abdurazak Mohammed"
              width="722"
              height="722"
              fetchPriority="high"
            />
          </div>
          <figcaption className="portrait-caption">
            <strong>Abdurazak Mohammed</strong>
            <span className="portrait-role">Full-stack developer</span>
            <span>
              <MapPin size={13} aria-hidden="true" /> Hawassa, Ethiopia
            </span>
          </figcaption>
        </figure>
        <div className="hero-footnote">
          <span>
            WEB APPLICATIONS <span>/</span> BACKEND SYSTEMS <span>/</span>{" "}
            REAL-WORLD IDEAS
          </span>
          <a className="hero-work-link" href="#projects">
            SELECTED WORK <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
