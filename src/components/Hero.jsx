import { useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  MessageCircle,
} from "lucide-react";
import { ProfileExplorer } from "./ProfileExplorer";
import { heroViews } from "../heroViews";
import "./Hero.css";

const viewIcons = { build: Code2, learn: GraduationCap, now: BriefcaseBusiness, connect: MessageCircle };

export function Hero() {
  const [selected, setSelected] = useState("build");
  const [interacted, setInteracted] = useState(false);
  const controls = useRef([]);
  const view = heroViews.find((item) => item.id === selected);

  function selectView(id) {
    if (id === selected) return;
    setInteracted(true);
    setSelected(id);
  }

  function handleKeyDown(event, index) {
    let next;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % heroViews.length; break;
      case "ArrowLeft": next = (index - 1 + heroViews.length) % heroViews.length; break;
      case "Home": next = 0; break;
      case "End": next = heroViews.length - 1; break;
      default: return;
    }
    event.preventDefault();
    selectView(heroViews[next].id);
    controls.current[next]?.focus();
  }

  return (
    <section id="home" className="hero-section hero-interactive" data-view={selected}>
      <div className="hero shell">
        <div className="hero-identity">
          <img className="hero-mobile-portrait" src="/abdurazak.png" alt="Abdurazak Mohammed" width="56" height="56" />
          <p className="eyebrow">
            <span className="blue-dot" /> FULL-STACK DEVELOPER · HAWASSA, ETHIOPIA
          </p>
          <div className="hero-name-line"><span>Hi, I’m</span> <h1>Abdurazak Mohammed.</h1></div>
        </div>
        <div className="hero-explore-controls">
          <p className="hero-explore-label">Explore my world <span aria-hidden="true">{view.number} / {String(heroViews.length).padStart(2, "0")}</span></p>
          <div className="hero-view-buttons" role="group" aria-label="Explore my world">
            {heroViews.map((item, index) => {
              const Icon = viewIcons[item.id];
              return (
                <button
                  key={item.id}
                  ref={(element) => { controls.current[index] = element; }}
                  type="button"
                  className={`profile-node profile-node-${item.id}`}
                  aria-pressed={selected === item.id}
                  aria-controls="hero-story profile-highlight"
                  onClick={() => selectView(item.id)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  <Icon size={17} aria-hidden="true" /> {item.label}
                </button>
              );
            })}
          </div>
        </div>
        <div id="hero-story" className="hero-stories">
          {heroViews.map((item) => (
            <div key={item.id} className={`hero-story ${selected === item.id ? "is-active" : ""}`} aria-hidden={selected !== item.id} inert={selected !== item.id}>
              <h2 className="hero-headline">{item.headline}<br /><span>{item.accent}</span></h2>
              <p className="hero-description">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="hero-announcement" role="status" aria-atomic="true">
          {interacted ? `${view.label}: ${view.headline} ${view.accent} ${view.description}` : ""}
        </p>
        <ProfileExplorer selected={selected} interacted={interacted} />
        <div className="hero-links">
          <p className="hero-current-role">
            Junior Developer at <a href="#experience">Yaltopia Tech</a>
            <span aria-hidden="true"> · </span>
            Intern at <a href="#experience">A RC ICT</a>
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
              href="https://www.linkedin.com/in/abdurazak-mohammed-264685205/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={17} /> LinkedIn <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="hero-footnote">
          <div className="hero-topic-views" aria-hidden="true">
            {heroViews.map((item) => (
              <span key={item.id} className={selected === item.id ? "is-active" : ""}>
                {item.topics.map((topic) => <span key={topic}>{topic}</span>)}
              </span>
            ))}
          </div>
          <a className="hero-work-link" href="#projects">
            SELECTED WORK <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
