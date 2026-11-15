import { useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, Code2, GraduationCap, MapPin } from "lucide-react";

const highlights = [
  {
    id: "build", label: "Build", icon: Code2, title: "From interface to API",
    description: "Full-stack web applications that connect responsive interfaces, backend systems, and data.",
    href: "#projects", link: "Explore my work",
  },
  {
    id: "learn", label: "Learn", icon: GraduationCap, title: "Curiosity, put into practice",
    description: "Studying software engineering at AASTU and exploring AI backend engineering and Web3.",
    href: "#about", link: "A little about me",
  },
  {
    id: "now", label: "Now", icon: BriefcaseBusiness, title: "Working across projects",
    description: "Junior Developer at Yaltopia Tech and Intern at A RC ICT, contributing to multiple projects at both companies.",
    href: "#experience", link: "Follow my journey",
  },
];

export function ProfileExplorer() {
  const [selected, setSelected] = useState("build");
  const highlight = highlights.find((item) => item.id === selected);
  return (
    <div className="profile-explorer">
      <div className="profile-orbit">
        <svg className="profile-connections" viewBox="0 0 400 350" aria-hidden="true" focusable="false">
          <circle cx="200" cy="175" r="148" />
          <path d="M 40 112 L 114 142 M 362 92 L 282 130 M 340 295 L 276 244" />
        </svg>
        <figure className="portrait-composition">
          <div className="portrait-frame">
            <img src="/abdurazak.png" alt="Abdurazak Mohammed" width="722" height="722" fetchPriority="high" />
          </div>
          <figcaption className="portrait-caption">
            <strong>Abdurazak Mohammed</strong>
            <span><MapPin size={12} aria-hidden="true" /> Hawassa, Ethiopia</span>
          </figcaption>
        </figure>
        <div className="profile-nodes" role="group" aria-label="Explore my profile">
          {highlights.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`profile-node profile-node-${id}`}
              aria-pressed={selected === id}
              aria-controls="profile-highlight"
              onClick={() => setSelected(id)}
            >
              <Icon size={17} aria-hidden="true" /> {label}
            </button>
          ))}
        </div>
      </div>
      <div id="profile-highlight" className="profile-highlight" aria-live="polite" aria-atomic="true">
        <p className="profile-detail-label"><span /> A LITTLE ABOUT ME</p>
        <h2>{highlight.title}</h2>
        <p>{highlight.description}</p>
        <a href={highlight.href}>{highlight.link} <ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>
    </div>
  );
}
