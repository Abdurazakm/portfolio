import App from "./App";
import { ServicePage } from "./components/ServicePage";
import { findService } from "./services";

export function Site({ pathname = "/" }) {
  const service = findService(pathname);
  if (service) return <ServicePage service={service} />;
  if (pathname === "/" || pathname === "/index.html") return <App />;
  return (
    <main id="main" className="shell service-hero">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>This page isn’t here<span>.</span></h1>
      <p className="service-intro">Explore my projects and services from the portfolio.</p>
      <div className="service-actions"><a href="/" className="button primary">Back to the portfolio</a></div>
    </main>
  );
}
