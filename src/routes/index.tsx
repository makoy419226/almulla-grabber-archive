import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import chairmanImg from "@/assets/chairman.jpg";
import educationImg from "@/assets/sector-education.jpg";
import energyImg from "@/assets/sector-energy.jpg";
import heroAlmullaEtihadImg from "@/assets/hero-almulla-etihad-burj.jpg";
import healthcareImg from "@/assets/healthcare.jpg";
import hospitalityImg from "@/assets/hospitality.jpg";
import realEstateImg from "@/assets/sector-real-estate.jpg";
import stackedLogoImg from "@/assets/logo-stacked-transparent.png";
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  HeartPulse,
  Quote,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AlMulla Holding Group — Dubai Holding Company" },
      {
        name: "description",
        content:
          "AlMulla Holding Group is a Dubai-based holding company building long-term value across healthcare, hospitality, real-estate, education, and strategic investment.",
      },
      { property: "og:title", content: "AlMulla Holding Group" },
      {
        property: "og:description",
        content:
          "A Dubai holding company focused on long-term value across healthcare, hospitality, real-estate, education, and strategic investment.",
      },
    ],
  }),
  component: Home,
});

const sectors = [
  {
    title: "Healthcare",
    img: healthcareImg,
    to: "/businesses/healthcare",
    icon: HeartPulse,
    body: "Delivering advanced healthcare services that improve lives and communities.",
  },
  {
    title: "Education",
    img: educationImg,
    to: "/businesses/education",
    icon: GraduationCap,
    body: "Supporting future generations through quality education and innovative learning.",
  },
  {
    title: "Real-estate",
    img: realEstateImg,
    to: "/businesses/real-estate",
    icon: Building2,
    body: "Developing resilient real-estate assets that support communities and long-term value.",
  },
  {
    title: "Hospitality",
    img: hospitalityImg,
    to: "/businesses/hospitality",
    icon: BedDouble,
    body: "Creating exceptional experiences through world-class hospitality and leisure.",
  },
  {
    title: "Energy",
    img: energyImg,
    to: "/businesses/energy",
    icon: Zap,
    body: "Powering progress through resilient energy platforms across solar, oil, gas, and future-ready infrastructure.",
  },
];

function Home() {
  return (
    <SiteLayout>
      <div className="home-legacy">
        <section className="legacy-hero">
          <div className="legacy-hero-grid mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-20">
            <div className="legacy-hero-copy reveal-up">
              <h1 className="legacy-heading">
                <span>Building Legacies.</span>
                <span>Empowering Futures.</span>
              </h1>
              <span className="legacy-line" aria-hidden="true" />
              <p className="mt-6 max-w-xl text-base leading-8 text-foreground/72">
                AlMulla Holding Group is a diversified holding company committed to long-term value
                creation and sustainable growth across key sectors that shape tomorrow.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="#businesses" className="btn-primary">
                  Explore Our Businesses
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link to="/about-us" className="btn-outline-legacy">
                  About AlMulla Holding
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="legacy-hero-visual reveal-up reveal-delay-1">
              <img
                src={heroAlmullaEtihadImg}
                alt="Golden AlMulla emblem sculpture with Dubai skyline and Etihad Rail"
                className="legacy-hero-image"
                width={1672}
                height={941}
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <section id="businesses" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="legacy-eyebrow">Our Businesses</div>
            <h2 className="legacy-section-title mt-3">Business Sectors</h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <Link key={sector.title} to={sector.to} className="legacy-sector-card">
                  <div className="legacy-sector-media">
                    <img
                      src={sector.img}
                      alt={sector.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width={700}
                      height={520}
                    />
                  </div>
                  <div className="legacy-sector-icon">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="p-6 pt-9">
                    <h3>{sector.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-foreground/66">{sector.body}</p>
                    <span className="mt-6 inline-flex text-primary">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="legacy-leadership">
            <div className="max-w-lg">
              <div className="legacy-eyebrow">Leadership & Vision</div>
              <h2 className="legacy-section-title mt-3 max-w-md">
                Guided by Purpose. Driven by Excellence.
              </h2>
              <p className="mt-5 text-sm leading-7 text-foreground/66">
                Our leadership is united by a clear purpose and a relentless drive to deliver
                long-term value, create impact, and build a better future.
              </p>
              <Link to="/about-us" className="btn-primary mt-7">
                Meet Our Leadership
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="legacy-chairman-wrap">
              <img
                src={chairmanImg}
                alt="AlMulla Holding chairman"
                className="legacy-chairman-img"
                loading="lazy"
                width={760}
                height={900}
              />
            </div>

            <div className="legacy-quote">
              <Quote className="h-9 w-9 text-gold" />
              <p>
                Our vision is to build a resilient and diversified portfolio that empowers enduring
                value and shapes a better tomorrow.
              </p>
              <span>Chairman&apos;s Message</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="legacy-cta">
            <div>
              <h2>Let&apos;s Build a Better Tomorrow. Together.</h2>
              <p>Partner with AlMulla Holding and be part of a legacy of growth and impact.</p>
            </div>
            <Link to="/contact-us" className="btn-light-legacy">
              Get In Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <img src={stackedLogoImg} alt="" className="legacy-cta-mark" aria-hidden="true" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-5 rounded-lg border border-primary/10 bg-white/70 p-6 sm:grid-cols-3">
            {[
              ["Portfolio", "Healthcare, hospitality, real-estate, education, and investment."],
              ["Approach", "Disciplined growth, long-term thinking, and clear operating standards."],
              ["Location", "Headquartered in Dubai with a regional business outlook."],
            ].map(([title, body]) => (
              <div key={title} className="legacy-info-item">
                <BriefcaseBusiness className="h-5 w-5 text-gold" />
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
