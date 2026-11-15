import { useState } from "react";
import { ArrowUpRight, ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export function Contact() {
  const [status, setStatus] = useState("idle");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/mdkgjpjd", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Message delivery failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };
  return (
    <section id="contact" className="contact-section section">
      <div className="shell contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">04 / LET’S CONNECT</p>
          <h2>
            Have something
            <br />
            in mind<span>?</span>
          </h2>
          <p>
            A project, an opportunity, or an interesting idea.
            <br />
            I’d love to hear about it.
          </p>
          <a className="email-link" href="mailto:abdurazakm343@gmail.com">
            abdurazakm343@gmail.com <ArrowUpRight size={22} />
          </a>
          <div className="contact-socials">
            <a
              href="https://github.com/Abdurazakm"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abdurazak-mohammed-a437b62b6/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="contact-form"
          aria-label="Contact Abdurazak"
          aria-busy={status === "sending"}
        >
          <div className="form-row">
            <div>
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                placeholder="Alex Morgan"
                required
                maxLength={100}
              />
            </div>
            <div>
              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="alex@example.com"
                required
                maxLength={254}
              />
            </div>
          </div>
          <label htmlFor="contact-subject">
            What’s it about? <span>(optional)</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            placeholder="A project, a role, or just hello"
            maxLength={200}
          />
          <label htmlFor="contact-message">Your message</label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="Tell me a little about what you have in mind…"
            required
            maxLength={5000}
          />
          <button
            type="submit"
            className="button primary"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending message…" : "Send message"}{" "}
            <ArrowRight size={17} />
          </button>
          <div
            className={"form-status " + status}
            role="status"
            aria-live="polite"
          >
            {status === "success" && "Thanks! Your message has been sent."}
            {status === "error" && (
              <span>
                Couldn’t send your message. Please try again or{" "}
                <a href="mailto:abdurazakm343@gmail.com">
                  email me directly <Mail size={14} />
                </a>
                .
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
