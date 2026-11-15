import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const root = useRef(null);
  useEffect(() => {
    if (!("IntersectionObserver" in window) || !Element.prototype.animate) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (media.matches) continue;
        const animation = entry.target.animate([
          { opacity: 0.3, transform: "translateY(16px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0.08 });
    root.current.querySelectorAll(
      ".section-heading, .project, .about-copy, .capability, .timeline-item, .education, .credential-card, .contact-copy, .contact-form",
    ).forEach((element) => observer.observe(element));
    const stopMotion = () => {
      if (media.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
    };
    media.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      media.removeEventListener("change", stopMotion);
    };
  }, []);
  return root;
}
