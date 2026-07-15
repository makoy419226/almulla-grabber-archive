import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as HeartPulse, d as Building2, f as ArrowUpRight, p as Sparkles } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, t as AlmullaLogo } from "./SiteLayout-iR5G3PbT.mjs";
import { t as chairman_default } from "./chairman-BNYjj-W5.mjs";
import { t as healthcare_default } from "./healthcare-CNRrxKdc.mjs";
import { t as hospitality_default } from "./hospitality-BZsCrB3S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BU3VneLY.js
var import_jsx_runtime = require_jsx_runtime();
var hero_default = "/assets/hero-9EGDo3YU.jpg";
function Home() {
	const sectors = [{
		title: "Healthcare",
		img: healthcare_default,
		to: "/businesses/healthcare",
		body: "Investments shaped around clinical quality, specialist partnerships, and modern patient experiences."
	}, {
		title: "Hospitality",
		img: hospitality_default,
		to: "/businesses/hospitality",
		body: "Hospitality concepts designed for modern travelers, comfort, and memorable service."
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 -z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_default,
						alt: "",
						className: "h-full w-full object-cover",
						width: 1920,
						height: 1080
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(90deg,rgba(250,248,245,0.97)_0%,rgba(250,248,245,0.88)_44%,rgba(250,248,245,0.6)_100%)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.2)_100%)]" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-12 px-4 pb-10 pt-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-20 lg:pt-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl self-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "reveal-up section-eyebrow",
							children: "Dubai holding group"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "reveal-up reveal-delay-1 mt-5 text-5xl font-bold leading-[0.95] tracking-tight text-primary sm:text-6xl lg:text-7xl",
							children: "AlMulla Holding Group"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "reveal-up reveal-delay-2 mt-6 max-w-xl text-base leading-8 text-foreground/70 sm:text-lg",
							children: "A modern holding company with focused investments in healthcare and hospitality, built around quality service and long-term value."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "reveal-up reveal-delay-2 mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/about-us",
								className: "btn-primary",
								children: ["Discover the group", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact-us",
								className: "inline-flex items-center justify-center rounded-full border border-border bg-white/70 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary",
								children: "Contact us"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "reveal-up reveal-delay-3 mt-10 grid max-w-xl grid-cols-3 gap-3",
							children: [
								{
									value: "2",
									label: "Core sectors"
								},
								{
									value: "Dubai",
									label: "Headquarters"
								},
								{
									value: "24/7",
									label: "Availability"
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-card rounded-2xl px-4 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl font-bold text-primary",
									children: item.value
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-xs uppercase tracking-[0.2em] text-foreground/55",
									children: item.label
								})]
							}, item.label))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "self-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "surface-card overflow-hidden rounded-[1.75rem] p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden rounded-[1.4rem]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: chairman_default,
									alt: "Chairman",
									className: "h-[420px] w-full object-cover sm:h-[520px]",
									loading: "eager",
									width: 900,
									height: 1100
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(23,17,14,0.12)_100%)]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute left-4 top-4 rounded-full bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur",
									children: "Chairman profile"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-4 left-4 right-4 surface-card rounded-2xl p-4 backdrop-blur",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold text-primary",
											children: "Mr. Abdulla Mohamed Saeed AlMulla"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs uppercase tracking-[0.2em] text-foreground/55",
											children: "Chairman"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlmullaLogo, { compact: true })]
									})
								})
							]
						})
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card rounded-[1.5rem] p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-[var(--gold)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-xl font-semibold text-primary",
								children: "Modern structure"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-7 text-foreground/70",
								children: "A focused portfolio with clean presentation, clear hierarchy, and an editorial layout."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card rounded-[1.5rem] p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, { className: "h-5 w-5 text-[var(--gold)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-xl font-semibold text-primary",
								children: "Healthcare focus"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-7 text-foreground/70",
								children: "Built around specialist partnerships, service quality, and patient-centered outcomes."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card rounded-[1.5rem] p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-5 w-5 text-[var(--gold)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-xl font-semibold text-primary",
								children: "Hospitality platform"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-7 text-foreground/70",
								children: "Designed for modern travelers with a calm, premium, and highly usable brand expression."
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex flex-wrap items-end justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-eyebrow",
					children: "Businesses"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "section-title mt-3 max-w-2xl",
					children: "Two core businesses, presented with a lighter touch."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-lg text-sm leading-7 text-foreground/65",
					children: "The site now leans into a cleaner, modern visual system with stronger spacing, soft surfaces, and animated entry states."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: sectors.map((sector) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "card-business overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "section-eyebrow",
								children: sector.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-2xl font-semibold text-primary",
								children: sector.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-7 text-foreground/70",
								children: sector.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: sector.to,
								className: "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-[var(--gold)]",
								children: ["Read more", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-[1.25rem]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: sector.img,
								alt: sector.title,
								className: "h-56 w-full object-cover transition-transform duration-500 hover:scale-[1.03]",
								loading: "lazy",
								width: 900,
								height: 600
							})
						})]
					})
				}, sector.title))
			})]
		})
	] });
}
//#endregion
export { Home as component };
