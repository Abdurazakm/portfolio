import { useId, useRef, useState } from "react";
import { ArrowUpRight, Code2, Layers, Monitor } from "lucide-react";
import "./ProjectPreview.css";

const tabs = [
  { id: "overview", label: "Overview", icon: Layers },
  { id: "screens", label: "Screens", icon: Monitor },
  { id: "stack", label: "Stack", icon: Code2 },
];

export function ProjectPreview({ project }) {
  const [selected, setSelected] = useState("overview");
  const prefix = useId();
  const buttons = useRef([]);
  const screenshot = `/projects/${project.image}.jpg`;

  function handleKeyDown(event, index) {
    let next;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % tabs.length; break;
      case "ArrowLeft": next = (index - 1 + tabs.length) % tabs.length; break;
      case "Home": next = 0; break;
      case "End": next = tabs.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setSelected(tabs[next].id);
    buttons.current[next]?.focus();
  }

  return (
    <div className="project-preview">
      <div className="project-preview-tabs" role="tablist" aria-label={`Explore ${project.title}`}>
        {tabs.map(({ id, label, icon: Icon }, index) => (
          <button
            key={id}
            ref={(element) => { buttons.current[index] = element; }}
            type="button"
            role="tab"
            id={`${prefix}-${id}-tab`}
            aria-selected={selected === id}
            aria-controls={`${prefix}-${id}-panel`}
            tabIndex={selected === id ? 0 : -1}
            className="project-preview-tab"
            onClick={() => setSelected(id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <Icon size={16} aria-hidden="true" /> {label}
          </button>
        ))}
      </div>
      <div className="project-preview-stage">
        {tabs.map(({ id, label }) => (
          <div
            key={id}
            id={`${prefix}-${id}-panel`}
            role="tabpanel"
            aria-labelledby={`${prefix}-${id}-tab`}
            tabIndex={0}
            hidden={selected !== id}
            className={`project-preview-panel project-preview-${id}`}
          >
            <p className="profile-detail-label">
              <span aria-hidden="true" /> {label.toUpperCase()}
            </p>
            {id === "overview" && (
              <>
                <a
                  className="browser-frame project-preview-thumbnail"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.title} live website (opens in a new tab)`}
                >
                  <div className="browser-bar" aria-hidden="true">
                    <i /><i /><i />
                    <span>{new URL(project.demo).hostname}</span>
                    <ArrowUpRight size={12} />
                  </div>
                  <img src={screenshot} alt={`${project.title} website homepage`} width="1274" height="718" loading="lazy" />
                </a>
                <h4>The purpose</h4>
                <p className="project-preview-description">{project.context}</p>
              </>
            )}
            {id === "screens" && (
              <figure className="project-screen">
                <a href={screenshot} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} homepage screenshot full-size (opens in a new tab)`}>
                  <img src={screenshot} alt={`${project.title} website homepage`} width="1274" height="718" loading="lazy" />
                </a>
                <figcaption>
                  <span>Homepage</span>
                  <a href={screenshot} target="_blank" rel="noreferrer">
                    View full-size <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </figcaption>
              </figure>
            )}
            {id === "stack" && (
              <>
                <h4>Behind the build</h4>
                <ul className="project-preview-technologies" aria-label={`${project.title} technologies`}>
                  {project.tech.map((tech) => <li key={tech}>{tech}</li>)}
                </ul>
                <p className="project-preview-description">{project.implementation}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
