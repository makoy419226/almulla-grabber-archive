import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { AlmullaLogo } from "@/components/AlmullaLogo";
import educationImg from "@/assets/sector-education.jpg";
import energyImg from "@/assets/sector-energy.jpg";
import realEstateImg from "@/assets/sector-real-estate.jpg";
import strategicInvestmentImg from "@/assets/sector-strategic-investment.jpg";
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Compass,
  Factory,
  GraduationCap,
  Handshake,
  Landmark,
  LineChart,
  ShieldCheck,
  SunMedium,
  Target,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Stat = {
  value: string;
  label: string;
};

type Pillar = {
  icon: LucideIcon;
  title: string;
  body: string;
};

type FocusArea = {
  title: string;
  body: string;
};

type BusinessPageData = {
  slug: string;
  sector: string;
  title: string;
  description: string;
  image: string;
  introTitle: string;
  introBody: string[];
  quote: string;
  stats: Stat[];
  pillars: Pillar[];
  focusAreas: FocusArea[];
  ctaTitle: string;
  ctaBody: string;
};

const businessPages: Record<string, BusinessPageData> = {
  "strategic-investment": {
    slug: "strategic-investment",
    sector: "Strategic investment",
    title: "Strategic Investment",
    description:
      "Disciplined capital allocation across resilient sectors, regional partnerships, and long-term growth platforms.",
    image: strategicInvestmentImg,
    introTitle: "Capital deployed with patience, selectivity, and operating clarity.",
    introBody: [
      "Strategic Investment sits at the center of how the group allocates capital. The focus is not short-term activity, but durable opportunities where the operating model, market position, and partnership structure are strong enough to create lasting value.",
      "We look for investments that fit the broader AlMulla platform: sectors with real demand, management teams that can execute, and business models that benefit from disciplined oversight rather than passive ownership.",
      "That approach helps the group stay flexible while still building a portfolio with coherence, resilience, and a long-term value thesis.",
    ],
    quote:
      "We invest where disciplined capital, operating partnership, and timing can translate into enduring value.",
    stats: [
      { value: "Long-term", label: "Investment horizon" },
      { value: "Regional", label: "Partnership outlook" },
      { value: "Multi-sector", label: "Portfolio lens" },
    ],
    pillars: [
      {
        icon: LineChart,
        title: "Portfolio Discipline",
        body: "Every opportunity is reviewed against return quality, downside protection, and strategic fit with the broader group.",
      },
      {
        icon: Target,
        title: "Selective Focus",
        body: "We prioritize opportunities where the path to value creation is clear and supported by defensible market demand.",
      },
      {
        icon: Handshake,
        title: "Partnership Alignment",
        body: "The best investments are built with operators, founders, and counterparties who share long-term priorities.",
      },
      {
        icon: ShieldCheck,
        title: "Risk Stewardship",
        body: "Structured governance, capital discipline, and measured pacing help protect the portfolio as markets shift.",
      },
    ],
    focusAreas: [
      {
        title: "Sector Selection",
        body: "Opportunities are screened around resilience, relevance to regional demand, and operational upside.",
      },
      {
        title: "Platform Partnerships",
        body: "We favor structures where active collaboration can improve execution, governance, and growth quality.",
      },
      {
        title: "Value Creation",
        body: "The objective is not only acquisition, but measurable improvement in business quality and long-term performance.",
      },
    ],
    ctaTitle: "Discuss investment opportunities with the group.",
    ctaBody:
      "For partnership conversations, strategic transactions, or sector opportunities, connect with the AlMulla Holding team.",
  },
  education: {
    slug: "education",
    sector: "Education",
    title: "Education",
    description:
      "Supporting future generations through strong learning environments, future-ready campuses, and long-term community value.",
    image: educationImg,
    introTitle: "Education platforms built around learning quality and future readiness.",
    introBody: [
      "Our education focus is shaped around the practical elements that define a strong learning environment: academic quality, campus experience, operational consistency, and relevance to the needs of students and families.",
      "We see education as a long-term sector. That requires facilities that perform well, leadership standards that stay clear over time, and programs that adapt to changing expectations in technology, language, and career readiness.",
      "The result is a sector approach centered on outcomes, trust, and sustainable institutional value.",
    ],
    quote:
      "Quality education creates compounding value for students, families, institutions, and the communities around them.",
    stats: [
      { value: "Student-first", label: "Operating mindset" },
      { value: "Future-ready", label: "Learning approach" },
      { value: "Community-led", label: "Long-term impact" },
    ],
    pillars: [
      {
        icon: GraduationCap,
        title: "Academic Standards",
        body: "We focus on institutions that can maintain clear educational quality and a trusted family experience.",
      },
      {
        icon: BookOpen,
        title: "Curriculum Relevance",
        body: "Programs should prepare students for a changing world, not only repeat legacy academic models.",
      },
      {
        icon: Compass,
        title: "Campus Experience",
        body: "The physical and operational environment matters: safety, accessibility, technology, and student support.",
      },
      {
        icon: Handshake,
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
    ctaTitle: "Explore education partnerships and growth opportunities.",
    ctaBody:
      "Reach out for discussions around education ventures, campus development, or institutional partnerships in Dubai and the wider region.",
  },
  "real-estate": {
    slug: "real-estate",
    sector: "Real-estate",
    title: "Real-estate",
    description:
      "Developing resilient real-estate assets built around quality locations, occupier demand, and long-term value.",
    image: realEstateImg,
    introTitle: "Real-estate strategy shaped by asset quality, demand durability, and disciplined execution.",
    introBody: [
      "Our real-estate approach is grounded in assets that can perform across cycles. That means careful attention to location quality, tenant relevance, build standards, and a long-term operating plan from the outset.",
      "We focus on spaces that support how people live, work, and interact in modern urban environments. Strong real-estate performance is not driven by launches alone, but by asset quality and active stewardship after delivery.",
      "For the group, real-estate is a platform for dependable value creation, not speculative volume.",
    ],
    quote:
      "The strongest assets are built with discipline before launch and managed with equal discipline afterward.",
    stats: [
      { value: "Mixed-use", label: "Portfolio orientation" },
      { value: "Income-led", label: "Value approach" },
      { value: "Prime locations", label: "Site discipline" },
    ],
    pillars: [
      {
        icon: Building2,
        title: "Development Quality",
        body: "We look for projects where design, specification, and positioning support long-term asset performance.",
      },
      {
        icon: Landmark,
        title: "Location Discipline",
        body: "Asset strength begins with locations that can retain demand, visibility, and utility over time.",
      },
      {
        icon: Compass,
        title: "Occupier Experience",
        body: "Real-estate value improves when spaces are practical, attractive, and responsive to tenant needs.",
      },
      {
        icon: ShieldCheck,
        title: "Lifecycle Management",
        body: "Post-delivery operations, maintenance, and governance are treated as part of the investment case.",
      },
    ],
    focusAreas: [
      {
        title: "Development Strategy",
        body: "Projects are assessed for market fit, timing, delivery discipline, and the ability to hold value after completion.",
      },
      {
        title: "Asset Operations",
        body: "The operating phase is where real-estate performance is protected through active management and standards.",
      },
      {
        title: "Long-term Demand",
        body: "We favor assets with credible occupier demand and use cases that remain relevant as the city evolves.",
      },
    ],
    ctaTitle: "Connect on real-estate opportunities and partnerships.",
    ctaBody:
      "Speak with the team about development, investment, and asset opportunities aligned with the group's long-term real-estate outlook.",
  },
  energy: {
    slug: "energy",
    sector: "Energy",
    title: "Energy",
    description:
      "Powering progress through resilient energy platforms across solar, infrastructure, and future-ready systems.",
    image: energyImg,
    introTitle: "Energy platforms built for reliability, infrastructure quality, and practical transition.",
    introBody: [
      "Our energy outlook is built around systems that matter in the real economy: generation, supporting infrastructure, and the operational partnerships required to deliver reliability at scale.",
      "We recognize that the sector now spans both conventional and renewable models. A practical energy strategy balances resilience today with transition pathways that remain commercially sound.",
      "That makes disciplined execution, industrial alignment, and infrastructure quality central to every opportunity we evaluate.",
    ],
    quote:
      "Energy investment works when reliability, economics, and transition planning are treated as one operating question.",
    stats: [
      { value: "Diversified", label: "Energy mix" },
      { value: "Infrastructure-led", label: "Execution model" },
      { value: "Future-ready", label: "Portfolio direction" },
    ],
    pillars: [
      {
        icon: Zap,
        title: "Reliable Supply",
        body: "Energy platforms must deliver dependable output and strong operating continuity under real market conditions.",
      },
      {
        icon: SunMedium,
        title: "Renewable Integration",
        body: "Solar and other renewable systems are approached as scalable infrastructure, not symbolic add-ons.",
      },
      {
        icon: Factory,
        title: "Industrial Alignment",
        body: "We prioritize projects that connect directly to practical industrial, commercial, and infrastructure demand.",
      },
      {
        icon: ShieldCheck,
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
    ctaTitle: "Discuss energy partnerships and platform opportunities.",
    ctaBody:
      "For conversations around solar, energy infrastructure, or broader platform partnerships, contact the AlMulla Holding team.",
  },
};

export const Route = createFileRoute("/businesses/$business")({
  head: ({ loaderData, params }) => {
    const page = loaderData ?? businessPages[params.business];

    if (!page) {
      return {
        meta: [
          { title: "Business Page Not Found — AlMulla Holding Group" },
          {
            name: "description",
            content: "This AlMulla Holding Group business page is not available.",
          },
        ],
      };
    }

    return {
      meta: [
        { title: `${page.title} — AlMulla Holding Group` },
        { name: "description", content: page.description },
        { property: "og:title", content: `${page.title} — AlMulla Holding Group` },
        { property: "og:description", content: page.description },
        { property: "og:image", content: page.image },
      ],
    };
  },
  loader: ({ params }) => {
    const page = businessPages[params.business];

    if (!page) {
      throw notFound();
    }

    return page;
  },
  component: BusinessPage,
  notFoundComponent: BusinessPageNotFound,
});

function BusinessPage() {
  const page = Route.useLoaderData();

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${page.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(51,18,20,0.96),rgba(51,18,20,0.82),rgba(51,18,20,0.35))]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-24 text-center sm:px-6 lg:px-8 lg:pb-40 lg:pt-32">
          <div className="motion-flip-bottom mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-lg bg-white/95 shadow-2xl shadow-black/20">
            <AlmullaLogo compact />
          </div>
          <div className="motion-flip-bottom motion-delay-1 flex items-center justify-center gap-3 text-sm font-semibold text-[var(--gold)]">
            <span className="h-px w-10 bg-[var(--gold)]" />
            Sector · {page.sector}
          </div>
          <h1 className="motion-flip-bottom motion-delay-2 mt-4 max-w-5xl text-5xl font-bold leading-none md:text-7xl lg:text-8xl">
            {page.title}
          </h1>
          <p className="copy-center motion-slide-bottom motion-delay-3 mt-7 max-w-3xl text-base leading-8 text-primary-foreground/78 sm:text-lg">
            {page.description}
          </p>

          <div className="data-center motion-slide-bottom motion-delay-4 mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 border-t border-primary-foreground/20 pt-8 sm:grid-cols-3">
            {page.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-[var(--gold)] md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="relative z-10 mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="motion-slide-bottom grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="surface-card rounded-lg p-8 lg:p-10">
              <div className="section-eyebrow">Sector overview</div>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-primary md:text-4xl">
                {page.introTitle}
              </h2>
              <div className="mt-7 space-y-5 text-sm leading-7 text-foreground/72 sm:text-base">
                {page.introBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <aside className="surface-card flex flex-col justify-between rounded-lg p-8 lg:p-10">
              <div>
                <div className="section-eyebrow">Investment lens</div>
                <p className="mt-4 text-2xl font-semibold leading-snug text-primary">
                  {page.quote}
                </p>
              </div>
              <div className="mt-8 overflow-hidden rounded-lg border border-primary/10">
                <img
                  src={page.image}
                  alt={page.title}
                  className="h-72 w-full object-cover"
                  loading="lazy"
                  width={1200}
                  height={800}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="legacy-eyebrow">Core priorities</div>
            <h2 className="legacy-section-title mt-3">What shapes the sector strategy</h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {page.pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const delayClass = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3", ""][index] ?? "";

              return (
                <div key={pillar.title} className={`surface-card reveal-up rounded-lg p-6 ${delayClass}`.trim()}>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/14 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-primary">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-foreground/68">{pillar.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="surface-card rounded-lg p-8 lg:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="legacy-eyebrow">Focus areas</div>
            <h2 className="legacy-section-title mt-3">Where value is built</h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {page.focusAreas.map((area, index) => (
              <div
                key={area.title}
                className={`rounded-lg border border-primary/10 bg-white/72 p-6 reveal-up ${
                  index === 0 ? "reveal-delay-1" : index === 1 ? "reveal-delay-2" : "reveal-delay-3"
                }`.trim()}
              >
                <h3 className="text-xl font-semibold text-primary">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-foreground/68">{area.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-primary md:text-4xl">
              {page.ctaTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/68 sm:text-base">
              {page.ctaBody}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 lg:justify-end">
            <Link to="/contact-us" className="btn-primary">
              Contact us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about-us"
              className="inline-flex items-center gap-2 rounded-md border border-primary/25 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              About the group
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function BusinessPageNotFound() {
  return (
    <SiteLayout>
      <section className="border-b border-primary/15 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="text-sm font-semibold text-[var(--gold)]">Business page</div>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Page not found.
          </h1>
          <p className="copy-center mt-5 max-w-2xl text-base leading-8 text-primary-foreground/72">
            The business page you requested is not currently published on the site.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="surface-card rounded-[1.25rem] p-6 text-center sm:p-8 lg:p-10">
          <div className="section-eyebrow">Available businesses</div>
          <h2 className="mt-4 text-3xl font-semibold text-primary">
            Explore the published business sectors.
          </h2>
          <p className="copy-center mt-4 max-w-2xl text-sm leading-7 text-foreground/68">
            Strategic investment, healthcare, education, real-estate, hospitality, and energy are
            all available from the main website.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-primary">
              Back home
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center rounded-md border border-border bg-white/72 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
