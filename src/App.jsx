import { useRef, useState } from "react";
import { useTheme } from "./useTheme";
import { useScrollReveal } from "./useScrollReveal";
import { CircuitBackground } from "./components/CircuitBackground";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { OpeningLoader } from "./components/OpeningLoader";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const main = useScrollReveal();
  const [networkPaused, setNetworkPaused] = useState(false);
  const content = useRef(null);
  return (
    <>
      <OpeningLoader contentRef={content} />
      <div ref={content}>
        <CircuitBackground paused={networkPaused} />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <main ref={main} id="main" tabIndex={-1}>
          <Hero />
          <Projects />
          <Services />
          <About />
          <Experience />
          <Contact />
        </main>
        <Footer
          networkPaused={networkPaused}
          onToggleNetwork={() => setNetworkPaused((paused) => !paused)}
        />
      </div>
    </>
  );
}
