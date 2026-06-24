import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/businesses/$business")({
  head: () => ({
    meta: [
      { title: "Business Page Not Found — AlMulla Holding Group" },
      {
        name: "description",
        content: "This AlMulla Holding Group business page is not available.",
      },
    ],
  }),
  loader: () => {
    throw notFound();
  },
  notFoundComponent: BusinessPageNotFound,
});

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
            The business page you requested does not have published content yet.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="surface-card glass-morph rounded-[1.25rem] p-6 sm:p-8 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8 lg:p-10">
          <div className="text-center">
            <div className="section-eyebrow">Available businesses</div>
            <h2 className="mt-4 text-3xl font-semibold text-primary">
              Explore the published business pages.
            </h2>
            <p className="copy-center mt-4 max-w-xl text-sm leading-7 text-foreground/68">
              Healthcare and hospitality currently have dedicated pages with full sector details.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:mt-0">
            <Link to="/businesses/healthcare" className="btn-primary">
              Healthcare
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/businesses/hospitality"
              className="inline-flex items-center justify-center rounded-md border border-border bg-white/72 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Hospitality
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
