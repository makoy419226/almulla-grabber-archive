import { useRef, type MouseEvent } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type HeaderExperienceButtonProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

const EXPERIENCE_ID = "sectors-experience";

export function HeaderExperienceButton({
  mobile = false,
  onNavigate,
}: HeaderExperienceButtonProps) {
  const clickLockedRef = useRef(false);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const experience = document.getElementById(EXPERIENCE_ID);

    onNavigate?.();
    if (!experience) return;

    event.preventDefault();
    if (clickLockedRef.current) return;

    clickLockedRef.current = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    experience.dispatchEvent(new CustomEvent("sector-experience-enter"));
    experience.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });

    window.setTimeout(
      () => {
        clickLockedRef.current = false;
      },
      reducedMotion ? 100 : 850,
    );
  };

  return (
    <a
      href="/sectors-experience"
      className={cn("header-experience-button", mobile && "header-experience-button-mobile")}
      onClick={handleClick}
      aria-label="Play the Four Sectors Experience"
    >
      <span className="header-experience-icon" aria-hidden="true">
        <Play />
      </span>
      <span>Explore Sectors</span>
    </a>
  );
}
