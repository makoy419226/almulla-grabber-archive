import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type UIEvent } from "react";
import { OPEN_MOBILE_MENU_EVENT, SiteLayout } from "@/components/SiteLayout";
import educationImg from "@/assets/sector-education.jpg";
import educationImg900 from "@/assets/sector-education-900.jpg";
import energyImg from "@/assets/sector-energy.jpg";
import energyImg900 from "@/assets/sector-energy-900.jpg";
import heroAlmullaEtihadImg from "@/assets/hero-almulla-etihad-burj.jpg";
import heroAlmullaEtihadImg720 from "@/assets/hero-almulla-etihad-burj-720.jpg";
import heroAlmullaEtihadImg960 from "@/assets/hero-almulla-etihad-burj-960.jpg";
import healthcareImg from "@/assets/sector-healthcare.jpg";
import healthcareImg900 from "@/assets/sector-healthcare-900.jpg";
import hospitalityImg from "@/assets/sector-hospitality.jpg";
import hospitalityImg900 from "@/assets/sector-hospitality-900.jpg";
import { ArrowLeft, Menu } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AlMulla Holding Group — Diversified Holding Company" },
      {
        name: "description",
        content:
          "AlMulla Holding Group is a diversified holding company building long-term value across healthcare, hospitality, education, and energy.",
      },
      { property: "og:title", content: "AlMulla Holding Group" },
      {
        property: "og:description",
        content:
          "A diversified holding company focused on long-term value across healthcare, hospitality, education, and energy.",
      },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: heroAlmullaEtihadImg720,
        imageSrcSet: `${heroAlmullaEtihadImg720} 720w, ${heroAlmullaEtihadImg960} 960w, ${heroAlmullaEtihadImg} 1536w`,
        imageSizes: "100vw",
      },
    ],
  }),
  component: Home,
});

const sectors = [
  {
    title: "Healthcare",
    img: healthcareImg,
    imgSmall: healthcareImg900,
    width: 1323,
    height: 1189,
    body: "Delivering advanced healthcare services that improve lives and communities.",
    detail:
      "Healthcare investments are shaped around trusted clinical partners, modern facilities, and services that raise the standard of care for the communities they serve.",
    focus: ["Clinical partnerships", "Advanced facilities", "Community impact"],
    stats: [
      { value: "15+", label: "Years of Investment" },
      { value: "20+", label: "Specialist Partners" },
      { value: "100K+", label: "Patient Touchpoints" },
    ],
    introTitle: "A commitment to the care and improvement of human life.",
    introBody: [
      "Chicago Healthcare invests in and manages high-quality healthcare projects in partnership with leading medical experts. Every venture is shaped around measurable patient outcomes and uncompromising clinical standards.",
      "We bring the highest standards of service to our local communities through the latest medical equipment and close partnerships with respected institutions, helping advance healthcare standards for the region.",
    ],
    quote:
      "These values are essential and timeless, guiding every investment, partnership, and patient experience we touch.",
    pillars: [
      {
        title: "Clinical Excellence",
        body: "Partnerships with leading specialists across cardiology, oncology, and advanced diagnostics.",
      },
      {
        title: "Advanced Technology",
        body: "Investment in the latest medical equipment and digital health infrastructure.",
      },
      {
        title: "World-Class Facilities",
        body: "Premium environments designed around patient dignity, comfort, and outcomes.",
      },
      {
        title: "Community Impact",
        body: "Programs that elevate standards of care for the communities we serve.",
      },
    ],
    focusAreas: [
      {
        title: "Specialist Partnerships",
        body: "Clinical partnerships are selected around trusted expertise and measurable outcomes.",
      },
      {
        title: "Modern Care Environments",
        body: "Facilities are planned to support patient dignity, practitioner efficiency, and service quality.",
      },
      {
        title: "Community Standards",
        body: "Healthcare investments are structured to raise care standards across the communities served.",
      },
    ],
  },
  {
    title: "Education",
    img: educationImg,
    imgSmall: educationImg900,
    width: 1535,
    height: 1024,
    body: "Supporting future generations through quality education and innovative learning.",
    detail:
      "Education platforms focus on strong learning environments, future-ready campuses, and institutional quality that creates lasting value for students and families.",
    focus: ["Learning quality", "Campus experience", "Future skills"],
    stats: [
      { value: "Student-first", label: "Operating mindset" },
      { value: "Future-ready", label: "Learning approach" },
      { value: "Community-led", label: "Long-term impact" },
    ],
    introTitle: "Education platforms built around learning quality and future readiness.",
    introBody: [
      "Our education focus is shaped around the practical elements that define a strong learning environment: academic quality, campus experience, operational consistency, and relevance to the needs of students and families.",
      "We see education as a long-term sector. That requires facilities that perform well, leadership standards that stay clear over time, and programs that adapt to changing expectations in technology, language, and career readiness.",
      "The result is a sector approach centered on outcomes, trust, and sustainable institutional value.",
    ],
    quote:
      "Quality education creates compounding value for students, families, institutions, and the communities around them.",
    pillars: [
      {
        title: "Academic Standards",
        body: "We focus on institutions that can maintain clear educational quality and a trusted family experience.",
      },
      {
        title: "Curriculum Relevance",
        body: "Programs should prepare students for a changing world, not only repeat legacy academic models.",
      },
      {
        title: "Campus Experience",
        body: "The physical and operational environment matters: safety, accessibility, technology, and student support.",
      },
      {
        title: "Institutional Partnerships",
        body: "Strong education platforms grow through credible academic leadership and aligned operating partners.",
      },
    ],
    focusAreas: [
      {
        title: "Learning Environments",
        body: "We support institutions designed to balance strong academics with the daily experience students need to thrive.",
      },
      {
        title: "Operational Quality",
        body: "Performance depends on staffing, systems, parent communication, and a campus model that stays dependable over time.",
      },
      {
        title: "Future Skills",
        body: "Technology, language, and practical readiness are embedded as core priorities in how education platforms evolve.",
      },
    ],
  },
  {
    title: "Hospitality",
    img: hospitalityImg,
    imgSmall: hospitalityImg900,
    width: 1536,
    height: 1024,
    body: "Creating exceptional experiences through world-class hospitality and leisure.",
    detail:
      "Hospitality concepts are built around thoughtful service, modern comfort, and destination experiences designed for business travelers, families, and lifestyle guests.",
    focus: ["Guest experience", "Hotel concepts", "Service standards"],
    stats: [
      { value: "3", label: "Brand concepts" },
      { value: "Business + leisure", label: "Guest profile" },
      { value: "Service-led", label: "Experience model" },
    ],
    introTitle: "Hospitality concepts shaped for modern travelers and practical luxury.",
    introBody: [
      "After a day of work or travel, a hotel should feel calm, efficient, and easy to trust. AlMulla Hospitality is built around that idea.",
      "Our properties are designed for guests who want thoughtful service, strong brand standards, and a modern environment that supports both work and rest.",
    ],
    quote: "Comfort, consistency, and service details define the guest experience.",
    pillars: [
      {
        title: "Guest Experience",
        body: "Each concept is designed around calm arrival, practical comfort, and dependable service touchpoints.",
      },
      {
        title: "Brand Standards",
        body: "Hospitality value depends on clear standards that guests can feel across every stay.",
      },
      {
        title: "Business Travel",
        body: "Properties support productive travel through flexible check-in, meeting spaces, and connected services.",
      },
      {
        title: "Lifestyle Comfort",
        body: "Hospitality settings balance local character, modern amenities, and spaces that support rest.",
      },
    ],
    focusAreas: [
      {
        title: "Cliftonwood Hotels & Resorts",
        body: "Distinctive, luxurious, and exclusive hotels and resorts designed around calm, local culture, spa experiences, international cuisine, and connected in-room services.",
      },
      {
        title: "Cliftonwood Park Hotels",
        body: "A business traveler's home away from home, with refined interiors, late automatic check-in, flexible meeting spaces, dining, convention rooms, and business centre services.",
      },
      {
        title: "Cliftonwood Tree Hotels",
        body: "Smart travel with uncompromised quality, warm personal service, stylish simplicity, and a place to replenish energy.",
      },
    ],
  },
  {
    title: "Energy",
    img: energyImg,
    imgSmall: energyImg900,
    width: 1536,
    height: 1024,
    body: "Powering progress through reliable energy platforms and solutions.",
    detail:
      "Energy platforms balance reliable infrastructure with practical transition planning across solar, core energy systems, and future-ready operating models.",
    focus: ["Reliable supply", "Solar platforms", "Transition infrastructure"],
    stats: [
      { value: "Diversified", label: "Energy mix" },
      { value: "Infrastructure-led", label: "Execution model" },
      { value: "Future-ready", label: "Portfolio direction" },
    ],
    introTitle:
      "Energy platforms built for reliability, infrastructure quality, and practical transition.",
    introBody: [
      "Our energy outlook is built around systems that matter in the real economy: generation, supporting infrastructure, and the operational partnerships required to deliver reliability at scale.",
      "We recognize that the sector now spans both conventional and renewable models. A practical energy strategy balances resilience today with transition pathways that remain commercially sound.",
      "That makes disciplined execution, industrial alignment, and infrastructure quality central to every opportunity we evaluate.",
    ],
    quote:
      "Energy investment works when reliability, economics, and transition planning are treated as one operating question.",
    pillars: [
      {
        title: "Reliable Supply",
        body: "Energy platforms must deliver dependable output and strong operating continuity under real market conditions.",
      },
      {
        title: "Renewable Integration",
        body: "Solar and other renewable systems are approached as scalable infrastructure, not symbolic add-ons.",
      },
      {
        title: "Industrial Alignment",
        body: "We prioritize projects that connect directly to practical industrial, commercial, and infrastructure demand.",
      },
      {
        title: "Resilience Planning",
        body: "Capital is directed toward systems that can adapt to policy, technology, and market changes over time.",
      },
    ],
    focusAreas: [
      {
        title: "Solar Platforms",
        body: "We see solar as a meaningful long-term asset class when execution quality and operating economics are clear.",
      },
      {
        title: "Core Energy Systems",
        body: "Conventional assets and supporting infrastructure remain relevant where reliability and industrial utility are essential.",
      },
      {
        title: "Transition Infrastructure",
        body: "The strongest energy platforms are designed to evolve rather than become obsolete as the market changes.",
      },
    ],
  },
];

type Sector = (typeof sectors)[number];
type SectorFullscreenImageStyle = CSSProperties & {
  "--sector-fullscreen-image": string;
};

function Home() {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [isSectorViewScrolled, setIsSectorViewScrolled] = useState(false);
  const sectorTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openSectorView = (sector: Sector, trigger: HTMLButtonElement) => {
    sectorTriggerRef.current = trigger;
    setIsSectorViewScrolled(false);
    setSelectedSector(sector);
  };

  const closeSectorView = useCallback(() => {
    setSelectedSector(null);
    setIsSectorViewScrolled(false);
    window.requestAnimationFrame(() => sectorTriggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!selectedSector) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (document.getElementById("mobile-navigation")) {
          return;
        }

        closeSectorView();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeSectorView, selectedSector]);

  const handleSectorContentScroll = (event: UIEvent<HTMLDivElement>) => {
    const nextScrolled = event.currentTarget.scrollTop > 8;
    setIsSectorViewScrolled((current) => (current === nextScrolled ? current : nextScrolled));
  };

  return (
    <SiteLayout>
      <div className="home-legacy scale-in-ver-top">
        <section className="legacy-hero">
          <div className="legacy-hero-media">
            <img
              src={heroAlmullaEtihadImg720}
              alt=""
              className="kenburns-top h-full w-full"
              srcSet={`${heroAlmullaEtihadImg720} 720w, ${heroAlmullaEtihadImg960} 960w, ${heroAlmullaEtihadImg} 1536w`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="100vw"
              width={1536}
              height={1024}
            />
            <div className="legacy-hero-grid flex px-4 sm:px-6 lg:px-8">
              <div className="legacy-hero-copy reveal-up">
                <h1 className="legacy-heading">
                  <span>Building Legacies.</span>
                  <span>Empowering Futures.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8">
                  AlMulla Holding Group is a diversified holding company committed to long-term
                  value creation and sustainable growth across key sectors that shape tomorrow.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="businesses"
          className="mx-auto max-w-[92rem] px-4 py-16 sm:px-6 lg:px-8 xl:py-24"
        >
          <div className="mx-auto max-w-4xl text-center">
            <div className="legacy-eyebrow">What We Do</div>
            <h2 className="legacy-section-title mt-3">Sectors That Shape Tomorrow</h2>
          </div>

          <div className="mx-auto mt-10 grid w-full max-w-2xl grid-cols-1 gap-5 sm:mt-12 sm:gap-6 xl:mt-16 xl:max-w-[92rem] xl:grid-cols-2 xl:gap-10">
            {sectors.map((sector) => (
              <button
                key={sector.title}
                type="button"
                className="legacy-sector-card"
                onClick={(event) => openSectorView(sector, event.currentTarget)}
                aria-label={`View ${sector.title} sector`}
              >
                <div className="legacy-sector-media">
                  <img
                    src={sector.img}
                    alt={sector.title}
                    className="h-full w-full object-cover"
                    srcSet={`${sector.imgSmall} 900w, ${sector.img} ${sector.width}w`}
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    sizes="(min-width: 1280px) 700px, 100vw"
                    width={sector.width}
                    height={sector.height}
                  />
                </div>
                <div className="legacy-sector-body">
                  <h3>{sector.title}</h3>
                  <p className="legacy-sector-copy mt-3">{sector.body}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {selectedSector ? (
        <section
          className="sector-fullscreen-shell"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sector-fullscreen-title"
        >
          <div
            className="sector-fullscreen-panel"
            role="document"
            data-scrolled={isSectorViewScrolled ? "true" : "false"}
            onScroll={handleSectorContentScroll}
          >
            <header className="sector-fullscreen-toolbar">
              <button
                type="button"
                className="sector-fullscreen-back"
                onClick={closeSectorView}
                autoFocus
              >
                <ArrowLeft className="h-5 w-5" aria-hidden />
                Go back
              </button>
              <nav
                className="sector-fullscreen-desktop-nav hidden md:flex"
                aria-label="Site navigation"
              >
                <Link to="/" onClick={closeSectorView}>
                  Home
                </Link>
                <Link to="/about-us" onClick={closeSectorView}>
                  Who We Are
                </Link>
                <Link to="/contact-us" onClick={closeSectorView}>
                  Get In Touch
                </Link>
              </nav>
              <button
                type="button"
                className="mobile-menu-trigger md:hidden"
                aria-label="Open site navigation"
                onClick={() => window.dispatchEvent(new Event(OPEN_MOBILE_MENU_EVENT))}
              >
                <Menu className="h-5 w-5" />
              </button>
            </header>

            <div
              className="sector-fullscreen-media"
              style={
                {
                  "--sector-fullscreen-image": `url(${selectedSector.img})`,
                } as SectorFullscreenImageStyle
              }
            >
              <img
                src={selectedSector.img}
                alt=""
                srcSet={`${selectedSector.imgSmall} 900w, ${selectedSector.img} ${selectedSector.width}w`}
                sizes="(min-width: 1024px) 42vw, 100vw"
                loading="lazy"
                decoding="async"
                width={selectedSector.width}
                height={selectedSector.height}
              />
              <div className="sector-fullscreen-media-overlay">
                <div className="legacy-eyebrow">Sector</div>
                <h3 id="sector-fullscreen-title">{selectedSector.title}</h3>
                <p>{selectedSector.body}</p>
                <span>Scroll down to view details</span>
              </div>
            </div>

            <div className="sector-fullscreen-content">
              <div className="sector-fullscreen-content-inner">
                <p>{selectedSector.detail}</p>

                <div
                  className="sector-fullscreen-stats"
                  aria-label={`${selectedSector.title} stats`}
                >
                  {selectedSector.stats.map((stat) => (
                    <div className="sector-fullscreen-stat" key={stat.label}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="sector-fullscreen-focus"
                  aria-label={`${selectedSector.title} focus areas`}
                >
                  {selectedSector.focus.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <div className="sector-fullscreen-section">
                  <div className="sector-fullscreen-section-kicker">Overview</div>
                  <h4>{selectedSector.introTitle}</h4>
                  <div className="sector-fullscreen-copy">
                    {selectedSector.introBody.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <blockquote className="sector-fullscreen-callout">
                  {selectedSector.quote}
                </blockquote>

                <div className="sector-fullscreen-section">
                  <div className="sector-fullscreen-section-kicker">Core priorities</div>
                  <div className="sector-fullscreen-list">
                    {selectedSector.pillars.map((pillar) => (
                      <article className="sector-fullscreen-list-item" key={pillar.title}>
                        <h5>{pillar.title}</h5>
                        <p>{pillar.body}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="sector-fullscreen-section">
                  <div className="sector-fullscreen-section-kicker">Focus areas</div>
                  <div className="sector-fullscreen-list">
                    {selectedSector.focusAreas.map((area) => (
                      <article className="sector-fullscreen-list-item" key={area.title}>
                        <h5>{area.title}</h5>
                        <p>{area.body}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </SiteLayout>
  );
}
