import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type SyntheticEvent,
} from "react";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import type {
  SectorsAssetProgress,
  SectorsExperience3DHandle,
} from "@/components/SectorsExperience3D";

const LazySectorsExperience3D = lazy(async () => {
  const sceneModule = await import("@/components/SectorsExperience3D");
  return { default: sceneModule.SectorsExperience3D };
});

export type SectorsExperienceSector = {
  slug: string;
  title: string;
  hint: string;
  body: string;
  notes: readonly string[];
};

type SectorsExperienceProps = {
  sectors: readonly SectorsExperienceSector[];
  video: string;
  standalone?: boolean;
};

type ExperienceStyle = CSSProperties & {
  "--sector-index": number;
  "--sector-count": number;
  "--sector-rotation": string;
  "--sector-orbit-rotation": string;
  "--sector-progress": number;
  "--experience-progress": number;
  "--sector-scene-shift": string;
};

export function SectorsExperience({ sectors, video, standalone = false }: SectorsExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scene3DRef = useRef<SectorsExperience3DHandle>(null);
  const animationFrameRef = useRef<number | null>(null);
  const assetStatusTimerRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [assetProgress, setAssetProgress] = useState<SectorsAssetProgress | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const [webglReady, setWebglReady] = useState(false);

  useEffect(
    () => () => {
      if (assetStatusTimerRef.current !== null) {
        window.clearTimeout(assetStatusTimerRef.current);
      }
    },
    [],
  );

  const updateFromScroll = useCallback(() => {
    animationFrameRef.current = null;
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
    const progress = Math.min(1, Math.max(0, (window.scrollY - sectionTop) / travel));
    const nextIndex = Math.min(sectors.length - 1, Math.floor(progress * sectors.length));
    const scenePosition = progress * Math.max(sectors.length - 1, 1);
    const reducedMotion = reducedMotionRef.current;
    const reducedProgress = (nextIndex + 0.5) / sectors.length;

    scene3DRef.current?.setProgress(reducedMotion ? reducedProgress : progress);

    section.style.setProperty("--experience-progress", progress.toFixed(4));
    section.style.setProperty(
      "--sector-progress",
      ((scenePosition + 1) / sectors.length).toFixed(4),
    );

    const scene = section.querySelector<HTMLVideoElement>(".sectors-experience-background video");
    if (scene) {
      scene.style.setProperty("--camera-x", "0vw");
      scene.style.setProperty("--camera-y", "0vh");
      scene.style.setProperty("--camera-z", "0rem");
      scene.style.setProperty("--camera-angle", "0deg");
      scene.style.setProperty("--camera-tilt", "0deg");
      scene.style.setProperty("--camera-scale", "1.04");
      scene.style.setProperty("--camera-opacity", "1");
      scene.style.setProperty("--camera-blur", "0px");
      scene.style.setProperty("--camera-clip-inset", "0%");

      if (Number.isFinite(scene.duration) && scene.duration > 0) {
        const targetTime = (reducedMotion ? reducedProgress : progress) * (scene.duration - 0.04);
        if (Math.abs(scene.currentTime - targetTime) > 0.025) {
          scene.currentTime = targetTime;
        }
      }
    }

    section.dataset.direction = window.scrollY >= lastScrollYRef.current ? "down" : "up";
    lastScrollYRef.current = window.scrollY;

    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  }, [sectors.length]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => {
      reducedMotionRef.current = mediaQuery.matches;
      updateFromScroll();
    };
    updateReducedMotion();
    mediaQuery.addEventListener("change", updateReducedMotion);
    return () => mediaQuery.removeEventListener("change", updateReducedMotion);
  }, [updateFromScroll]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      if (animationFrameRef.current !== null) return;
      animationFrameRef.current = window.requestAnimationFrame(updateFromScroll);
    };

    const handleEntrance = () => {
      setActiveIndex(0);
      scene3DRef.current?.reset();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    section.addEventListener("sector-experience-enter", handleEntrance);
    updateFromScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      section.removeEventListener("sector-experience-enter", handleEntrance);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, [updateFromScroll]);

  const scrollToSector = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section || isTransitioning) return;

      const nextIndex = Math.min(sectors.length - 1, Math.max(0, index));
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const travel = Math.max(section.offsetHeight - window.innerHeight, 0);
      const anchor = (nextIndex + 0.5) / sectors.length;
      const target = sectionTop + travel * anchor;
      const reducedMotion = reducedMotionRef.current;

      if (reducedMotion) {
        setActiveIndex(nextIndex);
        scene3DRef.current?.setProgress(anchor);
        section.style.setProperty("--experience-progress", anchor.toFixed(4));
        const fallbackVideo = section.querySelector<HTMLVideoElement>(
          ".sectors-experience-background video",
        );
        if (fallbackVideo && Number.isFinite(fallbackVideo.duration)) {
          fallbackVideo.currentTime = anchor * Math.max(fallbackVideo.duration - 0.04, 0);
        }
        return;
      }

      setIsTransitioning(true);
      window.scrollTo({ top: target, behavior: "smooth" });

      if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = window.setTimeout(() => setIsTransitioning(false), 650);
    },
    [isTransitioning, sectors.length],
  );

  const handleNext = () => {
    if (activeIndex < sectors.length - 1) {
      scrollToSector(activeIndex + 1);
      return;
    }

    if (standalone) {
      window.location.assign("/#businesses");
      return;
    }

    document.getElementById("businesses")?.scrollIntoView({
      behavior: reducedMotionRef.current ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (["ArrowDown", "PageDown"].includes(event.key)) {
      event.preventDefault();
      handleNext();
    } else if (["ArrowUp", "PageUp"].includes(event.key)) {
      event.preventDefault();
      scrollToSector(activeIndex - 1);
    } else if (event.key === "Escape") {
      event.currentTarget.blur();
    }
  };

  const handleVideoReady = (event: SyntheticEvent<HTMLVideoElement>) => {
    event.currentTarget.pause();
    updateFromScroll();
  };

  const handleWebglReady = useCallback(() => {
    setWebglFailed(false);
    setWebglReady(true);
    window.requestAnimationFrame(updateFromScroll);
  }, [updateFromScroll]);

  const handleWebglError = useCallback(() => {
    setAssetProgress(null);
    setWebglReady(false);
    setWebglFailed(true);
  }, []);

  const handleAssetProgress = useCallback((state: SectorsAssetProgress) => {
    if (assetStatusTimerRef.current !== null) {
      window.clearTimeout(assetStatusTimerRef.current);
      assetStatusTimerRef.current = null;
    }
    setAssetProgress(state);
    if (state.phase !== "loading") {
      assetStatusTimerRef.current = window.setTimeout(() => setAssetProgress(null), 1800);
    }
  }, []);

  if (sectors.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="sectors-experience"
      className="sectors-experience"
      style={
        {
          "--sector-index": activeIndex,
          "--sector-count": sectors.length,
          "--sector-rotation": `${activeIndex * -90}deg`,
          "--sector-orbit-rotation": `${activeIndex * 8}deg`,
          "--sector-progress": (activeIndex + 1) / sectors.length,
          "--experience-progress": 0,
          "--sector-scene-shift": `${activeIndex * -1.2}rem`,
        } as ExperienceStyle
      }
      data-active={activeIndex}
      data-webgl-failed={webglFailed ? "true" : "false"}
      data-webgl-ready={webglReady ? "true" : "false"}
      aria-label="Four Sectors Experience"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="sectors-experience-sticky">
        {standalone ? (
          <a href="/" className="sectors-experience-exit" aria-label="Return to the homepage">
            <ArrowLeft aria-hidden="true" />
          </a>
        ) : null}
        <div className="sectors-experience-background" aria-hidden="true">
          {webglFailed ? (
            <video
              src={video}
              preload="auto"
              muted
              playsInline
              disablePictureInPicture
              aria-hidden="true"
              data-active="true"
              onLoadedMetadata={handleVideoReady}
            />
          ) : (
            <Suspense
              fallback={
                <div className="sectors-experience-loading">
                  <span />
                  Rendering environments
                </div>
              }
            >
              <LazySectorsExperience3D
                ref={scene3DRef}
                onAssetProgress={handleAssetProgress}
                onReady={handleWebglReady}
                onError={handleWebglError}
              />
            </Suspense>
          )}
        </div>

        {webglReady && assetProgress ? (
          <div
            className="sectors-experience-enhancement-status"
            data-phase={assetProgress.phase}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <i aria-hidden="true">
              <b style={{ width: `${Math.round(assetProgress.progress * 100)}%` }} />
            </i>
            <span>{assetProgress.label}</span>
            {assetProgress.phase === "loading" ? (
              <strong>{Math.round(assetProgress.progress * 100)}%</strong>
            ) : null}
          </div>
        ) : null}

        <div className="sectors-experience-atmosphere" aria-hidden="true" />

        <div className="sectors-experience-overview" aria-live="polite" aria-atomic="true">
          <article key={sectors[activeIndex]?.slug}>
            <p className="sectors-experience-overview-meta">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span aria-hidden="true">/</span>
              <span>{String(sectors.length).padStart(2, "0")}</span>
              <i aria-hidden="true" />
              <span>{sectors[activeIndex]?.hint}</span>
            </p>
            <h1>{sectors[activeIndex]?.title}</h1>
            <p className="sectors-experience-overview-body">{sectors[activeIndex]?.body}</p>
            <ul className="sectors-experience-overview-notes" aria-label="Sector focus areas">
              {sectors[activeIndex]?.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </article>
        </div>

        <nav className="sectors-experience-progress" aria-label="Select a sector">
          {sectors.map((sector, index) => (
            <button
              key={sector.slug}
              type="button"
              data-active={index === activeIndex ? "true" : "false"}
              onClick={() => scrollToSector(index)}
              aria-label={`View sector ${index + 1}: ${sector.title}`}
              aria-current={index === activeIndex ? "step" : undefined}
            />
          ))}
        </nav>

        <div className="sectors-experience-controls">
          {activeIndex > 0 ? (
            <button
              type="button"
              className="sectors-experience-previous"
              onClick={() => scrollToSector(activeIndex - 1)}
              disabled={isTransitioning}
              aria-label={`Go back to ${sectors[activeIndex - 1]?.title}`}
            >
              <ChevronUp aria-hidden="true" />
            </button>
          ) : null}
          <button
            type="button"
            className="sectors-experience-next"
            onClick={handleNext}
            disabled={isTransitioning}
            aria-label={
              activeIndex === sectors.length - 1
                ? "Continue to all businesses"
                : `Continue to ${sectors[activeIndex + 1]?.title}`
            }
          >
            <ChevronDown aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
