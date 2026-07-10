export const PRIVACY_POLICY_OPEN_EVENT = "almulla:open-privacy-policy";

export const privacyPolicyLastUpdated = "8 July 2026";

export const privacyPolicyIntro =
  "This policy explains how AlMulla Holding Group handles information collected through this website and related business enquiries.";

export const privacyPolicyOverview = [
  "AlMulla Holding Group respects your privacy and is committed to handling personal information responsibly. This Privacy Policy applies to almullaholding.com and to information submitted through website-related communications.",
  "This website is intended for general corporate information and business enquiries. Please avoid submitting sensitive personal information unless we specifically ask for it.",
];

export const privacyPolicySections = [
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

export function openPrivacyPolicyModal() {
  window.dispatchEvent(new Event(PRIVACY_POLICY_OPEN_EVENT));
}
