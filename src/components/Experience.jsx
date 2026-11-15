import { ArrowUpRight, Award, GraduationCap, Plus, Shield } from "lucide-react";
import { certificates } from "../certificates";

const featuredCertificates = certificates.filter((cert) => cert.featured);
const otherCertificates = certificates.filter((cert) => !cert.featured);
const otherCertificateCount = otherCertificates.reduce(
  (total, cert) => total + (cert.images?.length ?? 1),
  0,
);

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
      <section
        id="credentials"
        className="credentials"
        aria-labelledby="credentials-heading"
      >
        <div className="credentials-heading">
          <div>
            <p className="eyebrow">LEARNING, PUT INTO PRACTICE</p>
            <h3 id="credentials-heading">
              Certifications & training<span>.</span>
            </h3>
          </div>
          <p>A foundation for the work I build.</p>
        </div>
        <div className="featured-credentials">
          {featuredCertificates.map((cert) => (
            <article className="credential-card" key={cert.title}>
              <div className="credential-card-top">
                <span className="issuer-mark" aria-hidden="true">
                  {cert.featured.monogram}
                </span>
                <span className="credential-kind">
                  <Award size={14} aria-hidden="true" /> Certificate
                </span>
              </div>
              <p className="eyebrow">
                {cert.issuer} · {cert.year}
              </p>
              <h4>{cert.featured.title}</h4>
              <p className="credential-description">{cert.featured.summary}</p>
              <ul className="tags" aria-label="Areas of study">
                {cert.featured.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <a
                className="credential-action"
                href={cert.image}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${cert.issuer} ${cert.featured.title} certificate (opens in a new tab)`}
              >
                View certificate <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </article>
          ))}
          <article className="credential-card credential-training">
            <div className="credential-card-top">
              <span className="issuer-mark" aria-hidden="true">
                INSA
              </span>
              <span className="credential-kind">
                <Shield size={14} aria-hidden="true" /> Training
              </span>
            </div>
            <p className="eyebrow">INSA · SUMMER 2025</p>
            <h4>Cyber Talent Summer Camp</h4>
            <p className="credential-description">
              Intensive training in cybersecurity and software development in
              Ethiopia.
            </p>
            <ul className="tags" aria-label="Areas of study">
              <li>Cybersecurity</li>
              <li>Development</li>
            </ul>
            <p className="credential-note">Development department</p>
          </article>
        </div>
        <details className="certificates">
          <summary>
            <span>
              More certificates{" "}
              <span className="certificate-count">
                {otherCertificates.length} collections · {otherCertificateCount}{" "}
                certificates
              </span>
            </span>
            <Plus size={20} />
          </summary>
          <div className="certificate-grid">
            {otherCertificates.map((cert) => (
              <article key={cert.title}>
                <p className="eyebrow">
                  {cert.issuer} · {cert.year}
                </p>
                <h4>{cert.title}</h4>
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
    </section>
  );
}
