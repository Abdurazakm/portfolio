import { ArrowUpRight, Globe2, Smartphone, Wrench } from "lucide-react";
import { services } from "../services";
import "./Services.css";

export const serviceIcons = { web: Globe2, mobile: Smartphone, maintenance: Wrench };

export function Services() {
  return (
    <section id="services" className="section shell services-section" aria-labelledby="services-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">WHAT I CAN HELP WITH</p>
          <h2 id="services-heading">From a first idea<br />to the next update<span>.</span></h2>
        </div>
        <p>Websites, apps, and practical support.<br />Based in Hawassa, Ethiopia.</p>
      </div>
      <div className="service-cards">
        {services.map((service) => {
          const Icon = serviceIcons[service.icon];
          return (
            <a className="service-card" href={service.path} key={service.slug}>
              <div className="service-card-top"><Icon size={24} aria-hidden="true" /><span>{service.number}</span></div>
              <h3>{service.name}</h3>
              <p>{service.summary}</p>
              <span className="service-card-link">Explore the service <ArrowUpRight size={17} aria-hidden="true" /></span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
