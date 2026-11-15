import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

function CertificateImage({ image, title }) {
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);

  return (
    <div className="certificate-image-stage" aria-busy={status === "loading"}>
      {status === "loading" && <p role="status">Loading certificate…</p>}
      {status === "error" ? (
        <div className="certificate-image-error" role="alert">
          <p>This certificate couldn’t be loaded. Please try again.</p>
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              setStatus("loading");
              setAttempt(attempt + 1);
            }}
          >
            Try again
          </button>
        </div>
      ) : (
        <img
          key={attempt}
          src={image}
          alt={`${title} certificate`}
          className={
            status === "loading"
              ? "certificate-image is-loading"
              : "certificate-image"
          }
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}
    </div>
  );
}

export function CertificateViewer({
  certificate,
  image = certificate.image,
  title = certificate.title,
  className,
  children,
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={className}
          aria-label={`View ${certificate.issuer} ${title} certificate`}
        >
          {children}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="certificate-viewer-overlay" />
        <Dialog.Content className="certificate-viewer">
          <div className="certificate-viewer-header">
            <p className="eyebrow">CERTIFICATE</p>
            <Dialog.Title className="certificate-viewer-title">
              {title}
            </Dialog.Title>
            <Dialog.Description className="certificate-viewer-description">
              {certificate.issuer} · {certificate.year}
            </Dialog.Description>
            <Dialog.Close asChild>
              <button
                type="button"
                className="certificate-viewer-close"
                aria-label="Close certificate"
              >
                <X size={21} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <CertificateImage image={image} title={title} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
