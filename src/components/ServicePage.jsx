import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CircuitBackground } from "./CircuitBackground";
import { serviceIcons } from "./Services";
import { useTheme } from "../useTheme";
import { useScrollReveal } from "../useScrollReveal";
import { projects } from "../projects";
import { services } from "../services";

export function ServicePage({ service }) {
  const { theme, toggleTheme } = useTheme();
  const main = useScrollReveal();
  const [networkPaused, setNetworkPaused] = useState(false);
  const Icon = serviceIcons[service.icon];
  return (
    <>
      <CircuitBackground paused={networkPaused} />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header theme={theme} onToggleTheme={toggleTheme} onHome={false} />
      <main ref={main} id="main" tabIndex={-1} className="service-page">
        <section id="home" className="shell service-hero" aria-labelledby="service-title">
          <nav className="service-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><a href="/#services">Services</a><span aria-hidden="true">/</span><span aria-current="page">{service.name}</span>
          </nav>
          <div className="service-hero-layout">
            <div>
              <p className="eyebrow">SERVICE {service.number} / HAWASSA, ETHIOPIA</p>
              <h1 id="service-title">{service.headline}<br /><span>{service.accent}</span></h1>
              <p className="service-intro">{service.intro}</p>
              <div className="service-actions">
                <a href="/#contact" className="button primary">Discuss your project <ArrowUpRight size={17} /></a>
                <a href="#related-work" className="text-link">Explore related work <ArrowRight size={17} /></a>
              </div>
            </div>
            <aside className="service-prompt" aria-label="Ideas to start a conversation">
              <div className="service-card-top"><Icon size={26} aria-hidden="true" /><span>{service.number} / A STARTING POINT</span></div>
              <h2>Sound familiar<span>?</span></h2>
              <ul>{service.prompts.map((prompt) => <li key={prompt}><span className="blue-dot" aria-hidden="true" />{prompt}</li>)}</ul>
              <p>You can start in your own words.</p>
            </aside>
          </div>
        </section>

        <section className="shell section service-detail-layout" aria-labelledby="service-help-heading">
          <div>
            <p className="eyebrow">FOR YOUR BUSINESS</p>
            <h2 id="service-help-heading">What we can work on<span>.</span></h2>
            <div className="service-needs">
              {service.business.map((item, index) => (
                <div className="service-need" key={item.title}>
                  <span className="eyebrow">0{index + 1}</span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </div>
              ))}
            </div>
          </div>
          <aside className="service-technical">
            <p className="eyebrow">FOR TECHNICAL READERS</p>
            <h3>Behind the interface.</h3>
            <p>{service.technical}</p>
            <ul className="tags" aria-label="Relevant technologies">{service.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
          </aside>
        </section>

        <section id="related-work" className="shell section service-work" aria-labelledby="related-work-heading">
          <div className="section-heading">
            <div><p className="eyebrow">EXISTING PROJECTS</p><h2 id="related-work-heading">See it in context<span>.</span></h2></div>
            <p>{service.workIntro}</p>
          </div>
          <div className="service-work-grid">
            {service.related.map((slug) => {
              const project = projects.find((item) => item.slug === slug);
              return (
                <article className="service-work-card" key={slug}>
                  <a href={`/#project-${slug}`} aria-label={`Explore ${project.title} in the portfolio`}>
                    <img src={`/projects/${project.image}.jpg`} alt={`${project.title} website homepage`} width="1274" height="718" loading="lazy" />
                  </a>
                  <div>
                    <p className="eyebrow">{project.category}</p><h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <ul className="tags" aria-label={`${project.title} technologies`}>{project.tech.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                    <a className="text-link" href={`/#project-${slug}`}>Read the project explanation <ArrowUpRight size={16} /></a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="shell section service-detail-layout service-start" aria-labelledby="service-start-heading">
          <div>
            <p className="eyebrow">START A CONVERSATION</p><h2 id="service-start-heading">Bring the idea.<br />Or the problem<span>.</span></h2>
            <ol className="service-start-list">{service.start.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
          <div className="service-faq">
            <h3>A few things you may be wondering.</h3>
            {service.questions.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}<Plus size={18} aria-hidden="true" /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="shell service-closing" aria-labelledby="service-cta-heading">
          <p className="eyebrow">LET’S CONNECT</p><h2 id="service-cta-heading">{service.cta}</h2>
          <a className="button primary" href="/#contact">Tell me what you need <ArrowUpRight size={17} /></a>
          <nav className="service-other-links" aria-label="Other services">
            {services.filter((item) => item.slug !== service.slug).map((item) => <a href={item.path} key={item.slug}>{item.name}<ArrowRight size={15} /></a>)}
          </nav>
          <a className="text-link" href="/#services"><ArrowLeft size={16} /> Back to all services</a>
        </section>
      </main>
      <Footer homeHref="/" networkPaused={networkPaused} onToggleNetwork={() => setNetworkPaused((paused) => !paused)} />
    </>
  );
}
