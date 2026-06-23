import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BrandIcon } from "@/components/BrandIcon";
import healthcareImg from "@/assets/healthcare.jpg";

export const Route = createFileRoute("/businesses/healthcare")({
  head: () => ({
    meta: [
      { title: "Chicago Healthcare — AlMulla Holding Group" },
      { name: "description", content: "Chicago Healthcare is committed to investing in quality healthcare projects with top medical experts in Dubai." },
      { property: "og:title", content: "Chicago Healthcare" },
      { property: "og:description", content: "Quality healthcare projects with top medical experts." },
      { property: "og:image", content: "/src/assets/healthcare.jpg" },
    ],
  }),
  component: Healthcare,
});

function Healthcare() {
  return (
    <SiteLayout>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BrandIcon className="w-16 h-20 mx-auto mb-4" />
          <h1 className="font-serif text-5xl text-primary uppercase">Chicago Healthcare</h1>
          <span className="gold-divider" />
        </div>
        <div className="max-w-3xl mx-auto px-4 mt-8 text-muted-foreground leading-relaxed space-y-5 text-lg">
          <p>
            Chicago Healthcare is committed to the care and improvement of human life. In
            recognition of this commitment, we strive to invest in and manage high-quality
            healthcare projects together with leading medical experts.
          </p>
          <p>
            We bring the highest standards of service to our local communities through the
            latest medical equipment and through close partnerships with respected
            institutions. Our vision is to help establish Dubai as a strong healthcare
            hub within the wider region.
          </p>
          <p>
            We believe these value statements are essential and timeless — guiding every
            investment, partnership and patient experience we touch.
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-4 mt-12">
          <img src={healthcareImg} alt="Healthcare" className="rounded-lg shadow-xl w-full h-80 object-cover" loading="lazy" width={1200} height={600} />
        </div>
      </section>
    </SiteLayout>
  );
}
