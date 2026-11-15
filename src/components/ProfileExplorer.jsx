import { ArrowUpRight, Code2, Github, GraduationCap, Linkedin, Mail, MapPin } from "lucide-react";
import { heroViews } from "../heroViews";
import { contactEmail } from "../contactSubmission";
import { trackEmailClick } from "../inquiryTracking";

const connections = {
  build: "M 40 112 L 114 142",
  learn: "M 362 92 L 282 130",
  now: "M 340 295 L 276 244",
  connect: "M 42 273 L 122 240",
};

export function ProfileExplorer({ selected, interacted }) {
  const selectedView = heroViews.find((view) => view.id === selected);
  return (
    <div className="profile-explorer">
      <div className="profile-orbit">
        <svg className="profile-connections" viewBox="0 0 400 350" aria-hidden="true" focusable="false">
          <circle cx="200" cy="175" r="148" />
          {Object.entries(connections).map(([id, path]) => <path key={id} d={path} className={selected === id ? "profile-connection-selected" : ""} />)}
          {interacted && <path key={selected} className="profile-connection-pulse" d={connections[selected]} pathLength="100" />}
        </svg>
        <figure className="portrait-composition">
          <div className="portrait-frame">
            <img src="/abdurazak.png" alt="Abdurazak Mohammed" width="722" height="722" fetchPriority="high" />
          </div>
          <figcaption className="portrait-caption">
            <span><MapPin size={12} aria-hidden="true" /> Hawassa, Ethiopia</span>
          </figcaption>
        </figure>
        <span className="hero-orbit-caption" aria-hidden="true">
          {selectedView.orbitCaption}
        </span>
      </div>
      <div id="profile-highlight" className="profile-highlight hero-visual-views">
        {heroViews.map((view) => (
          <div key={view.id} className={`hero-visual-view ${selected === view.id ? "is-active" : ""}`} aria-hidden={selected !== view.id} inert={selected !== view.id}>
            <div className="hero-visual-heading">
              <p className="profile-detail-label"><span aria-hidden="true" /> {view.detailLabel}</p>
              <span className="hero-view-number" aria-hidden="true">{view.number}</span>
            </div>
            {view.id === "build" && (
              <div className="hero-build-preview">
                <a className="hero-project-image" href="#projects" aria-label="Explore Fetan Delivery in selected work">
                  <img src="/projects/fetan.jpg" alt="Fetan Delivery website homepage" width="1274" height="718" />
                  <span><ArrowUpRight size={16} aria-hidden="true" /></span>
                </a>
                <div><h3>Fetan Delivery</h3><p>From the kitchen to the campus.</p><span className="hero-mini-stack"><Code2 size={14} aria-hidden="true" /> React · Node.js · PostgreSQL · Prisma</span></div>
              </div>
            )}
            {view.id === "learn" && (
              <div className="hero-learning-path">
                <div className="hero-study"><GraduationCap size={24} aria-hidden="true" /><div><h3>Software Engineering</h3><p>Addis Ababa Science and Technology University</p></div></div>
                <div className="hero-learning-topics"><span>AI backend engineering</span><span>Web3 · AASTU GDG Club</span></div>
              </div>
            )}
            {view.id === "now" && (
              <div className="hero-current-work">
                <div><span className="hero-company-mark" aria-hidden="true">YT</span><div><h3>Yaltopia Tech</h3><p>Junior Developer</p></div></div>
                <div><span className="hero-company-mark" aria-hidden="true">ARC</span><div><h3>A RC ICT</h3><p>Intern</p></div></div>
              </div>
            )}
            {view.id === "connect" && (
              <div className="hero-connect-card">
                <a className="hero-connect-email" href={`mailto:${contactEmail}`} onClick={() => trackEmailClick("hero_connect")}>
                  <Mail size={20} aria-hidden="true" />
                  <span><strong>Email me</strong><span>{contactEmail}</span></span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <div className="hero-connect-socials">
                  <a href="https://github.com/Abdurazakm" target="_blank" rel="noreferrer"><Github size={17} aria-hidden="true" /> GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
                  <a href="https://www.linkedin.com/in/abdurazak-mohammed-264685205/" target="_blank" rel="noreferrer"><Linkedin size={17} aria-hidden="true" /> LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a>
                </div>
              </div>
            )}
            <a className="hero-view-link" href={view.href}>{view.link} <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        ))}
      </div>
    </div>
  );
}
