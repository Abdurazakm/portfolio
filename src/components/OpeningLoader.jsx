import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import "./OpeningLoader.css";

export function OpeningLoader({ contentRef }) {
  const [phase, setPhase] = useState("loading");
  const [ready, setReady] = useState(false);
  const overlay = useRef(null);

  useEffect(() => {
    if (phase !== "loading") return;
    let cancelled = false;
    let revealTimer;
    const started = performance.now();
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimumDuration = reducedMotion ? 0 : 5000;
    // Only wait for the opening portrait and fonts, never offscreen/lazy assets.
    const portrait = document.querySelector('.hero-mobile-portrait');
    const assets = [
      document.fonts?.ready ?? Promise.resolve(),
      portrait?.decode ? portrait.decode() : Promise.resolve(),
    ];
    Promise.allSettled(assets).then(() => {
      if (cancelled) return;
      setReady(true);
      revealTimer = window.setTimeout(
        () => setPhase("exiting"),
        Math.max(0, minimumDuration - (performance.now() - started)),
      );
    });
    // An unavailable asset must never keep visitors behind the intro.
    const deadline = window.setTimeout(() => setPhase("exiting"), reducedMotion ? 800 : 5000);
    const skip = (event) => {
      if (event.key === "Escape") setPhase("exiting");
    };
    window.addEventListener("keydown", skip);
    return () => {
      cancelled = true;
      clearTimeout(revealTimer);
      clearTimeout(deadline);
      window.removeEventListener("keydown", skip);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const duration = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 550;
    const timer = window.setTimeout(() => setPhase("done"), duration);
    return () => clearTimeout(timer);
  }, [phase]);

  const active = phase !== "done";
  useEffect(() => {
    if (!active) return;
    const content = contentRef.current;
    const panel = overlay.current;
    const previousOverflow = document.body.style.overflow;
    const previousInert = content?.inert;
    document.body.style.overflow = "hidden";
    if (content) content.inert = true;
    return () => {
      const restoreFocus = panel?.contains(document.activeElement);
      document.body.style.overflow = previousOverflow;
      if (content) content.inert = previousInert;
      if (restoreFocus) document.getElementById("main")?.focus({ preventScroll: true });
    };
  }, [active, contentRef]);

  function moveGlow(event) {
    if (event.pointerType === "touch" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { currentTarget, clientX, clientY } = event;
    currentTarget.style.setProperty("--pointer-x", `${(clientX / window.innerWidth) * 100}%`);
    currentTarget.style.setProperty("--pointer-y", `${(clientY / window.innerHeight) * 100}%`);
    currentTarget.style.setProperty("--tilt-x", `${(0.5 - clientY / window.innerHeight) * 12}deg`);
    currentTarget.style.setProperty("--tilt-y", `${(clientX / window.innerWidth - 0.5) * 12}deg`);
  }

  if (!active) return null;

  return (
    <div
      ref={overlay}
      className={`portfolio-loader ${phase === "exiting" ? "is-exiting" : ""}`}
      onPointerMove={moveGlow}
      onPointerLeave={(event) => {
        for (const property of ["--pointer-x", "--pointer-y", "--tilt-x", "--tilt-y"]) {
          event.currentTarget.style.removeProperty(property);
        }
      }}
      aria-label="Welcome to Abdurazak's portfolio"
    >
      <div className="loader-grid" aria-hidden="true" />
      <div className="loader-topline">
        <span className="loader-brand">AM<span>.</span></span>
        <span className="loader-edition">A LITTLE CURIOSITY. A LOT OF CODE.</span>
      </div>

      <div className="loader-center">
        <div className="loader-orbit" aria-hidden="true">
          <div className="loader-ring loader-ring-outer"><i /></div>
          <div className="loader-ring loader-ring-inner"><i /></div>
          <span className="loader-coordinate loader-coordinate-top">&lt;create /&gt;</span>
          <span className="loader-coordinate loader-coordinate-bottom">ideas → experiences</span>
          <div className="loader-monogram">A<span>M</span><b>.</b></div>
        </div>
        <p className="loader-eyebrow">WELCOME TO MY WORLD</p>
        <p className="loader-name">Abdurazak<span> Mohammed.</span></p>
        <p className="loader-description">Thoughtful code. Meaningful experiences.</p>
        <div className={`loader-track ${ready || phase === "exiting" ? "is-ready" : ""}`} aria-hidden="true"><span /></div>
        <p className="loader-status" role="status" aria-live="polite">
          <span />{ready || phase === "exiting" ? "Ready. Let’s explore." : "Setting the scene…"}
        </p>
      </div>

      <div className="loader-bottomline">
        <span className="loader-hint">MOVE YOUR CURSOR. FOLLOW THE GLOW.</span>
        <button type="button" className="loader-skip" onClick={() => setPhase("exiting")}>
          Skip intro <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
