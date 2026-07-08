import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy - AlMulla Holding Group" },
      {
        name: "description",
        content:
          "Privacy Policy for AlMulla Holding Group, including how website data, enquiries, and cookie preferences are handled.",
      },
      { property: "og:title", content: "Privacy Policy - AlMulla Holding Group" },
      {
        property: "og:description",
        content:
          "Learn how AlMulla Holding Group handles website data, enquiries, and cookie preferences.",
      },
    ],
  }),
  component: PrivacyPolicy,
});

const policySections = [
  {
    title: "Information We Collect",
    body: [
      "We may collect information you provide directly, such as your name, email address, phone number, company details, and the content of enquiries you send to us.",
      "When you use the website, we may also collect technical information such as browser type, device information, pages visited, approximate location derived from network data, and cookie preferences.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use information to respond to enquiries, manage business communications, operate and secure the website, improve website content and performance, and meet legal or regulatory obligations.",
      "We do not sell personal information. Where marketing or analytics tools are used, non-essential cookies are controlled through the cookie preference manager.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "Cookies are small files stored by your browser. We use functional cookies that are necessary for basic website operation and may use analytical, preference, or targeted cookies only according to your saved choices.",
      "You can accept all cookies, reject non-essential cookies, or manage individual categories at any time from the website footer.",
    ],
  },
  {
    title: "Cookie Categories",
    body: [
      "Functional cookies are always active because they support security, consent storage, and basic browsing features.",
      "Analytical cookies help us understand website usage. Preference cookies remember browsing choices. Targeted or advertising cookies support relevant campaign measurement if such tools are enabled.",
    ],
  },
  {
    title: "Sharing Information",
    body: [
      "We may share information with service providers, professional advisers, affiliated entities, or public authorities where necessary for website operations, business administration, legal compliance, or protection of rights.",
      "Service providers are expected to process information only for the purposes we specify and to apply appropriate safeguards.",
    ],
  },
  {
    title: "Retention And Security",
    body: [
      "We keep personal information only for as long as needed for the purposes described in this policy, unless a longer retention period is required or permitted by law.",
      "We use reasonable technical and organisational measures to protect information, but no website or email transmission can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "Your Choices And Rights",
    body: [
      "Depending on applicable law, you may have rights to request access, correction, deletion, restriction, objection, or withdrawal of consent for certain uses of your personal information.",
      "You can change your cookie preferences at any time using the Manage Cookies control in the footer.",
    ],
  },
  {
    title: "Updates To This Policy",
    body: [
      "We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised last updated date.",
    ],
  },
];

function PrivacyPolicy() {
  return (
    <SiteLayout>
      <section className="page-hero privacy-hero border-b border-primary/15 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="text-sm font-semibold text-[var(--gold)]">Privacy</div>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="copy-center mt-5 max-w-2xl text-base leading-8 text-primary-foreground/76">
            This policy explains how AlMulla Holding Group handles information collected through
            this website and related business enquiries.
          </p>
          <p className="copy-center mt-4 text-sm text-primary-foreground/58">
            Last updated: 8 July 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="privacy-policy-grid">
          <div className="surface-card rounded-lg p-6 sm:p-8">
            <div className="section-eyebrow">Overview</div>
            <h2 className="mt-4 text-3xl font-semibold text-primary">Our commitment</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-foreground/72 sm:text-base">
              <p>
                AlMulla Holding Group respects your privacy and is committed to handling personal
                information responsibly. This Privacy Policy applies to almullaholding.com and to
                information submitted through website-related communications.
              </p>
              <p>
                This website is intended for general corporate information and business enquiries.
                Please avoid submitting sensitive personal information unless we specifically ask
                for it.
              </p>
            </div>
          </div>

          {policySections.map((section) => (
            <article className="surface-card rounded-lg p-6 sm:p-8" key={section.title}>
              <h2 className="text-2xl font-semibold text-primary">{section.title}</h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-foreground/72 sm:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}

          <div className="surface-card rounded-lg p-6 sm:p-8">
            <div className="section-eyebrow">Contact</div>
            <h2 className="mt-4 text-2xl font-semibold text-primary">Privacy enquiries</h2>
            <p className="mt-5 text-sm leading-7 text-foreground/72 sm:text-base">
              For questions about this Privacy Policy or privacy-related requests, contact AlMulla
              Holding Group using the details below.
            </p>
            <div className="data-center mt-6 grid gap-4 sm:grid-cols-2">
              <a
                href="mailto:info@almullaholding.com"
                className="flex min-h-24 flex-col items-center justify-center gap-3 rounded-md border border-border bg-white px-4 py-5 text-sm text-foreground/78 transition-colors hover:text-primary"
              >
                <Mail className="h-5 w-5 text-[var(--gold)]" />
                info@almullaholding.com
              </a>
              <a
                href="tel:+97142249662"
                className="flex min-h-24 flex-col items-center justify-center gap-3 rounded-md border border-border bg-white px-4 py-5 text-sm text-foreground/78 transition-colors hover:text-primary"
              >
                <Phone className="h-5 w-5 text-[var(--gold)]" />
                04 224 9662
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
