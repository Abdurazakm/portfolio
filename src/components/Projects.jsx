import { ArrowUpRight, Github } from "lucide-react";
import { ProjectPreview } from "./ProjectPreview";

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
    walkthrough: [
      {
        title: "Campus ordering",
        description: "Food ordering for AASTU students, with service availability and order management.",
      },
      {
        title: "Restaurant operations",
        description: "Admin dashboards bring the operational side of the delivery platform into the application.",
      },
      {
        title: "Delivery updates",
        description: "Order tracking, delivery status, and SMS notifications keep the delivery process connected.",
      },
    ],
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
                <p className="project-stack-note">
                  <strong>The stack</strong> React, Node.js, PostgreSQL, and Prisma
                  bring the interface, backend, and data together in a full-stack application.
                </p>
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
