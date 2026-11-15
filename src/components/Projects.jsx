import { ArrowUpRight, Github } from "lucide-react";
import { ProjectPreview } from "./ProjectPreview";

import { projects } from "../projects";

export function Projects() {
  return (
    <section id="projects" className="section shell">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / SELECTED WORK</p>
          <h2>
            Ideas, brought to life<span>.</span>
          </h2>
        </div>
        <p>
          A selection of applications and websites
          <br className="desktop-break" /> built around real needs.
        </p>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <article
            id={`project-${project.slug}`}
            className={"project project-" + project.image}
            key={project.title}
          >
            <ProjectPreview project={project} />
            <div className="project-copy">
              <div className="project-kicker">
                <span>{project.walkthrough ? "FEATURED / " : ""}{project.category}</span>
                <span>{project.number}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="project-tagline">{project.description}</p>
              <p className="muted">{project.summary}</p>
              <ul className="tags" aria-label="Technologies">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className="project-links">
                <a href={project.demo} target="_blank" rel="noreferrer">
                  Visit website <ArrowUpRight size={16} />
                </a>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <Github size={16} /> Source code
                  </a>
                )}
              </div>
            </div>
            <div className="project-explanations">
              <div><h4>What people can do</h4><p>{project.userExplanation}</p></div>
              <div><h4>How it works technically</h4><p>{project.implementation}</p></div>
            </div>
            {project.walkthrough && (
              <section className="project-overview" aria-labelledby="fetan-overview-heading">
                <div className="project-overview-intro">
                  <p className="eyebrow">PROJECT OVERVIEW</p>
                  <h4 id="fetan-overview-heading">Connecting campus orders and delivery.</h4>
                  <p>{project.context}</p>
                </div>
                <ol className="project-walkthrough">
                  {project.walkthrough.map((step) => (
                    <li key={step.title}>
                      <h5>{step.title}</h5>
                      <p>{step.description}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </article>
        ))}
      </div>
      <div className="more-work">
        <div>
          <span className="eyebrow">ALSO BUILT</span>
          <h3>Agency Client Information System</h3>
          <p>
            An application for registering clients, signing in, and viewing reports.
            PHP provides the application logic, with MySQL for its data.
          </p>
        </div>
        <a
          className="button secondary"
          href="https://github.com/Abdurazakm/IP2-PROJECT"
          target="_blank"
          rel="noreferrer"
        >
          Explore the code <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
