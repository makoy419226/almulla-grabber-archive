import { Mail, Phone, X } from "lucide-react";
import {
  privacyPolicyIntro,
  privacyPolicyLastUpdated,
  privacyPolicyOverview,
  privacyPolicySections,
} from "@/lib/privacy-policy";

type PrivacyPolicyModalProps = {
  open: boolean;
  onClose: () => void;
  onExited: () => void;
};

export function PrivacyPolicyModal({ open, onClose, onExited }: PrivacyPolicyModalProps) {
  return (
    <div
      className="privacy-modal-shell"
      role="presentation"
      data-state={open ? "open" : "closed"}
      onAnimationEnd={(event) => {
        if (event.currentTarget === event.target && !open) {
          onExited();
        }
      }}
    >
      <div className="privacy-modal-backdrop" onClick={onClose} />
      <section
        className="privacy-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        <div className="privacy-modal-header">
          <div>
            <p className="privacy-modal-kicker">Privacy</p>
            <h2 id="privacy-modal-title">Privacy Policy</h2>
            <p className="privacy-modal-intro">{privacyPolicyIntro}</p>
            <p className="privacy-modal-updated">Last updated: {privacyPolicyLastUpdated}</p>
          </div>
          <button
            type="button"
            className="privacy-modal-close"
            aria-label="Close Privacy Policy"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="privacy-modal-content">
          <article className="privacy-modal-card">
            <p className="section-eyebrow">Overview</p>
            <h3>Our commitment</h3>
            {privacyPolicyOverview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>

          {privacyPolicySections.map((section) => (
            <article className="privacy-modal-card" key={section.title}>
              <h3>{section.title}</h3>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}

          <article className="privacy-modal-card">
            <p className="section-eyebrow">Contact</p>
            <h3>Privacy enquiries</h3>
            <p>
              For questions about this Privacy Policy or privacy-related requests, contact AlMulla
              Holding Group using the details below.
            </p>
            <div className="privacy-modal-contact">
              <a href="mailto:info@almullaholding.com">
                <Mail className="h-4 w-4" />
                info@almullaholding.com
              </a>
              <a href="tel:+97142249688">
                <Phone className="h-4 w-4" />
                04 2249688
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
