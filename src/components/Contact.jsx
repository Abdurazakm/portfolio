import { useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { contactEmail, contactEndpoint, createEmailDraft, submitContact } from "../contactSubmission";
import { trackEmailClick } from "../inquiryTracking";

export function Contact() {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailDraft, setEmailDraft] = useState(`mailto:${contactEmail}`);
  const sending = useRef(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    sending.current = true;
    setEmailDraft(createEmailDraft(data));
    setStatus("sending");
    const result = await submitContact(data);
    sending.current = false;
    if (result.accepted) {
      form.reset();
      setStatus("success");
    } else {
      setErrorMessage(result.message);
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
            Need a website for your business, an online ordering system, a
            mobile app, or help fixing an existing website? I can help with
            website updates, bug fixes, and ongoing software maintenance.
          </p>
          <p>
            Tell me what you need in your own words. You don’t need a technical
            brief to start a conversation.
          </p>
          <a className="email-link" href={`mailto:${contactEmail}`} onClick={() => trackEmailClick("contact_section")}>
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
              href="https://www.linkedin.com/in/abdurazak-mohammed-264685205/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </div>
        <form
          action={contactEndpoint}
          method="POST"
          onSubmit={handleSubmit}
          className="contact-form"
          aria-label="Contact Abdurazak"
          aria-busy={status === "sending"}
          onInput={(event) => {
            setEmailDraft(createEmailDraft(new FormData(event.currentTarget)));
            if (!sending.current) setStatus("idle");
          }}
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
            {status === "success" && "Thanks! Your message was submitted. You can also reach me directly by email below."}
            {status === "error" && (
              <span>
                {errorMessage}
              </span>
            )}
          </div>
          <a className="contact-email-fallback" href={emailDraft} onClick={() => trackEmailClick("contact_form_fallback")}>
            <Mail size={15} aria-hidden="true" /> Open this message in your email app
          </a>
        </form>
      </div>
    </section>
  );
}
