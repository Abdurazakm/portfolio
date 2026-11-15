import { ArrowUpRight, Github, Plus } from "lucide-react";

const projects = [
  {
    title: "Fetan Delivery",
    category: "FULL-STACK APPLICATION",
    image: "fetan",
    number: "01",
    description: "From the kitchen to the campus.",
    summary:
      "A food delivery platform connecting AASTU students with meals, order tracking, and delivery updates.",
    tech: ["React", "Node.js", "PostgreSQL", "Prisma"],
    demo: "https://fetandelivery.netlify.app/",
    context:
      "Campus food ordering brings together customers, restaurant operations, and delivery status.",
    implementation:
      "The platform combines order management, admin dashboards, service availability, and SMS notifications in one full-stack application.",
  },
  {
    title: "VoiceLocal",
    category: "WEB & MOBILE APPLICATION",
    image: "voicelocal",
    number: "02",
    description: "A digital voice for local communities.",
    summary:
      "Report neighborhood issues, vote on priorities, and follow progress through a connected web and mobile experience.",
    tech: ["React", "Flutter", "Firebase", "Firestore"],
    demo: "https://voice-local.netlify.app/",
    github: "https://github.com/Abdurazakm/VoiceLocal",
    context:
      "Residents need a shared place to surface local concerns and see what happens next.",
    implementation:
      "Photo and video reports, community voting, role-based access, sector moderation, and a notification inbox are supported by real-time Firestore feeds.",
  },
  {
    title: "Mayaye Eye Clinic",
    category: "BUSINESS WEBSITE",
    image: "mayaye",
    number: "03",
    description: "A clearer path to eye care.",
    summary:
      "A digital presence for a Hawassa eye clinic, making services, eyewear, and contact information easier to discover.",
    tech: ["React", "Responsive UI", "Web Design"],
    demo: "https://mayayeeyeclinic.com",
    context:
      "Patients need clear service information and a straightforward way to find and contact a clinic.",
    implementation:
      "The website brings clinic services, eyewear browsing, and visit information together in a responsive interface.",
  },
];

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
            className={"project project-" + project.image}
            key={project.title}
          >
            <a
              className="project-visual"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={"Open " + project.title + " live website"}
            >
              <div className="browser-frame">
                <div className="browser-bar">
                  <i />
                  <i />
                  <i />
                  <span>{new URL(project.demo).hostname}</span>
                  <ArrowUpRight size={12} />
                </div>
                <img
                  src={"/projects/" + project.image + ".jpg"}
                  alt={project.title + " website homepage"}
                  width="1274"
                  height="718"
                  loading="lazy"
                />
              </div>
              <span className="preview-label">
                LIVE WEBSITE <ArrowUpRight size={14} />
              </span>
            </a>
            <div className="project-copy">
              <div className="project-kicker">
                <span>{project.category}</span>
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
              <details className="project-details">
                <summary>
                  Behind the project <Plus size={16} />
                </summary>
                <div>
                  <h4>The purpose</h4>
                  <p>{project.context}</p>
                  <h4>The implementation</h4>
                  <p>{project.implementation}</p>
                </div>
              </details>
            </div>
          </article>
        ))}
      </div>
      <div className="more-work">
        <div>
          <span className="eyebrow">ALSO BUILT</span>
          <h3>Agency Client Information System</h3>
          <p>
            Client registration, reporting, and authentication with PHP & MySQL.
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
