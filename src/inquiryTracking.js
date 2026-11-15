import { siteUrl } from "../seo.config.mjs";
import { findService } from "./services.js";

const emailLocations = new Set(["hero_connect", "contact_section", "contact_form_fallback"]);

// Only fixed event labels enter analytics. Never pass FormData or mailto URLs here.
export function createInquiryTracker(send) {
  const record = (name, parameters) => {
    try { send(name, parameters); } catch { /* Analytics must not interrupt contact actions. */ }
  };
  return {
    contactSubmitted() {
      record("generate_lead", { lead_source: "portfolio_contact_form" });
    },
    emailClicked(location) {
      if (emailLocations.has(location)) record("email_link_click", { link_location: location });
    },
  };
}

export function analyticsAllowed(measurementId, origin, production) {
  return production && /^G-[A-Z0-9]{6,20}$/.test(measurementId) &&
    origin === new URL(siteUrl).origin;
}

export function analyticsPageContext(locationHref, referrer = "") {
  const location = new URL(locationHref);
  const path = findService(location.pathname)?.path ||
    (["/", "/index.html"].includes(location.pathname) ? "/" : "/404/");
  let referringOrigin = "";
  try {
    const url = new URL(referrer);
    if (["https:", "http:"].includes(url.protocol)) referringOrigin = url.origin + "/";
  } catch { /* No referrer is normal for direct visits. */ }
  return { page_location: new URL(path, siteUrl).href, page_referrer: referringOrigin };
}

let sendEvent;
const tracker = createInquiryTracker((name, parameters) => sendEvent?.(name, parameters));
export const trackContactSuccess = tracker.contactSubmitted;
export const trackEmailClick = tracker.emailClicked;

export function initializeInquiryTracking(measurementId, production = false) {
  if (sendEvent || typeof window === "undefined" ||
      !analyticsAllowed(measurementId, window.location.origin, production)) return false;
  try {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    const page = analyticsPageContext(window.location.href, document.referrer);
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      ...page,
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    sendEvent = (name, parameters) => window.gtag("event", name, {
      ...parameters, ...page, send_to: measurementId,
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.id = "portfolio-analytics";
    document.head.appendChild(script);
    sendEvent("page_view", {});
    return true;
  } catch {
    sendEvent = undefined;
    return false;
  }
}
