import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal";
import { SiteLayout } from "@/components/SiteLayout";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => createSeoHead("/privacy-policy"),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [renderModal, setRenderModal] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (open || !renderModal) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(
      () => {
        setRenderModal(false);
        void navigate({ to: "/" });
      },
      prefersReducedMotion ? 0 : 300,
    );

    return () => window.clearTimeout(timeout);
  }, [navigate, open, renderModal]);

  return (
    <SiteLayout>
      <section className="sr-only" aria-label="Privacy Policy" />
      {renderModal && (
        <PrivacyPolicyModal
          open={open}
          onClose={() => setOpen(false)}
          onExited={() => {
            setRenderModal(false);
            void navigate({ to: "/" });
          }}
        />
      )}
    </SiteLayout>
  );
}
