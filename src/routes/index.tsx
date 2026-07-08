import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import educationImg from "@/assets/sector-education.jpg";
import energyImg from "@/assets/sector-energy.jpg";
import heroAlmullaEtihadImg from "@/assets/hero-almulla-etihad-burj.jpg";
import healthcareImg from "@/assets/healthcare.jpg";
import hospitalityImg from "@/assets/hospitality.jpg";
import { ArrowUpRight } from "lucide-react";

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
  }),
  component: Home,
});

const sectors = [
  {
    title: "Healthcare",
    img: healthcareImg,
    body: "Delivering advanced healthcare services that improve lives and communities.",
  },
  {
    title: "Education",
    img: educationImg,
    body: "Supporting future generations through quality education and innovative learning.",
  },
  {
    title: "Hospitality",
    img: hospitalityImg,
    body: "Creating exceptional experiences through world-class hospitality and leisure.",
  },
  {
    title: "Energy",
    img: energyImg,
    body: "Powering progress through resilient energy platforms across solar, oil, gas, and future-ready infrastructure.",
  },
];

function Home() {
  return (
    <SiteLayout>
      <div className="home-legacy">
        <section className="legacy-hero">
          <div className="legacy-hero-media">
            <img
              src={heroAlmullaEtihadImg}
              alt=""
              className="h-full w-full object-cover"
              loading="eager"
              width={1672}
              height={941}
            />
            <div className="legacy-hero-grid mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
              <div className="legacy-hero-copy reveal-up">
                <div className="legacy-hero-kicker">AlMulla Holding</div>
                <h1 className="legacy-heading">
                  <span>Building Legacies.</span>
                  <span>Empowering Futures.</span>
                </h1>
                <span className="legacy-line" aria-hidden="true" />
                <p className="mt-6 max-w-xl text-base leading-8">
                  AlMulla Holding Group is a diversified holding company committed to long-term
                  value creation and sustainable growth across key sectors that shape tomorrow.
                </p>
                <Link to="/about-us" className="legacy-learn-link">
                  Learn More
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="businesses"
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-4xl text-center">
            <div className="legacy-eyebrow">What We Do</div>
            <h2 className="legacy-section-title mt-3">Our Portfolio</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {sectors.map((sector) => (
              <article key={sector.title} className="legacy-sector-card">
                <div className="legacy-sector-media">
                  <img
                    src={sector.img}
                    alt={sector.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width={900}
                    height={620}
                  />
                </div>
                <div className="legacy-sector-body">
                  <h3>{sector.title}</h3>
                  <p className="legacy-sector-copy mt-3">{sector.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
