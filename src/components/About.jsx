import { Code2, Database, Layers, ArrowUpRight } from "lucide-react";

const capabilities = [
  {
    icon: Code2,
    title: "Interfaces that make sense",
    description:
      "Responsive web experiences with React, JavaScript, and Tailwind CSS.",
  },
  {
    icon: Database,
    title: "The systems behind the screen",
    description:
      "APIs and application logic with Node.js, Express, Python, and Django.",
  },
  {
    icon: Layers,
    title: "Connected from end to end",
    description:
      "Data-driven applications with PostgreSQL, MySQL, MongoDB, and Firebase.",
  },
];

export function About() {
  return (
    <section id="about" className="about-section section">
      <div className="shell about-layout">
        <div className="about-copy">
          <p className="eyebrow">02 / A LITTLE ABOUT ME</p>
          <h2>
            Curious by nature.
            <br />
            Developer by practice<span>.</span>
          </h2>
          <p>
            I’m Abdurazak Mohammed, a full-stack web developer based in Hawassa,
            Ethiopia. I’m also studying software engineering at Addis Ababa
            Science and Technology University (AASTU), with a focus on backend
            development.
          </p>
          <p>
            I enjoy connecting the pieces: a clear interface, a well-structured
            API, and the data that makes a product useful. My projects explore
            everything from campus delivery to community participation.
          </p>
          <p>
            Alongside building, I’m continuing to explore AI backend engineering
            and Web3 with the AASTU GDG Club.
          </p>
          <a
            className="text-link"
            href="https://github.com/Abdurazakm"
            target="_blank"
            rel="noreferrer"
          >
            See what I’m building <ArrowUpRight size={17} />
          </a>
        </div>
        <div id="skills" className="capabilities">
          {capabilities.map(({ icon: Icon, title, description }, index) => (
            <div className="capability" key={title}>
              <div className="capability-top">
                <Icon size={23} />
                <span>0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
