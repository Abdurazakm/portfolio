import { useState } from "react";
import { useTheme } from "./useTheme";
import { CircuitBackground } from "./components/CircuitBackground";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [networkPaused, setNetworkPaused] = useState(false);
  return (
    <>
      <CircuitBackground paused={networkPaused} />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        networkPaused={networkPaused}
        onToggleNetwork={() => setNetworkPaused((paused) => !paused)}
      />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
