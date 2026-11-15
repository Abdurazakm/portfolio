import { useState } from "react";
import { NetworkBackground } from "./components/NetworkBackground";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const [networkPaused, setNetworkPaused] = useState(false);
  return (
    <>
      <NetworkBackground paused={networkPaused} />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header
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
