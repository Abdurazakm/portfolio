export const contactEmail = "abdurazakm343@gmail.com";
export const contactEndpoint = "https://formspree.io/f/mdkgjpjd";

export function createEmailDraft(data) {
  const subject = String(data.get("subject") || "Portfolio enquiry");
  const body = `${data.get("message") || ""}\n\nFrom: ${data.get("name") || ""}\nEmail: ${data.get("email") || ""}`;
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// An accepted submission is not proof of delivery to the recipient's inbox.
export async function submitContact(data, fetchRequest = fetch) {
  try {
    const response = await fetchRequest(contactEndpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json().catch(() => null);
    const errors = Array.isArray(result?.errors) ? result.errors : [];
    if (response.ok && result?.ok === true && !result.error && errors.length === 0) {
      return { accepted: true };
    }
    const message = errors.map((error) => error.message).filter((text) => typeof text === "string").join(" ");
    return {
      accepted: false,
      message: message || "We couldn’t confirm your submission. Your message is still here — please email it directly.",
    };
  } catch {
    return {
      accepted: false,
      message: "We couldn’t confirm your submission. Your message is still here — please email it directly.",
    };
  }
}
