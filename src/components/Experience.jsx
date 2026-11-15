import { ArrowUpRight, GraduationCap, Plus } from "lucide-react";
import { certificates } from "../certificates";

const experience = [
  {
    period: "2026",
    title: "AASTU GDG Club",
    role: "Web3 learning",
    description:
      "Exploring blockchain fundamentals and decentralized application development.",
  },
  {
    period: "SUMMER 2025",
    title: "INSA Cyber Talent Summer Camp",
    role: "Development training",
    description:
      "Intensive training in cybersecurity and software development.",
  },
  {
    period: "2025",
    title: "ALX Africa",
    role: "Backend development education",
    description: "Python, Django, APIs, and software design principles.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="section shell">
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / THE JOURNEY</p>
          <h2>
            Always building. Always learning<span>.</span>
          </h2>
        </div>
      </div>
      <div className="experience-layout">
        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item" key={item.title}>
              <p className="eyebrow">{item.period}</p>
              <div>
                <h3>{item.title}</h3>
                <span className="experience-role">{item.role}</span>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <aside className="education">
          <GraduationCap size={30} />
          <p className="eyebrow">EDUCATION · 2023–PRESENT</p>
          <h3>Software Engineering</h3>
          <p>Addis Ababa Science and Technology University</p>
          <div className="education-bottom">
            Algorithms. Systems. Practical problem solving.
          </div>
        </aside>
      </div>
      <details className="certificates">
        <summary>
          <span>
            Certificates & continued learning{" "}
            <span className="certificate-count">
              {certificates.length} collections
            </span>
          </span>
          <Plus size={20} />
        </summary>
        <div className="certificate-grid">
          {certificates.map((cert) => (
            <article key={cert.title}>
              <p className="eyebrow">
                {cert.issuer} · {cert.year}
              </p>
              <h3>{cert.title}</h3>
              {cert.images ? (
                <ul>
                  {cert.images.map((image, index) => (
                    <li key={image}>
                      <a href={image} target="_blank" rel="noreferrer">
                        {cert.certificateNames[index]}{" "}
                        <ArrowUpRight size={14} />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <a href={cert.image} target="_blank" rel="noreferrer">
                  View certificate <ArrowUpRight size={15} />
                </a>
              )}
            </article>
          ))}
        </div>
      </details>
    </section>
  );
}
