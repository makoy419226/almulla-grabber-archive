import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { f as ArrowUpRight, o as MapPin, r as Phone, s as Mail } from "../_libs/lucide-react.mjs";
import { n as SiteLayout } from "./SiteLayout-iR5G3PbT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-us-DpsIr9uO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	const [sent, setSent] = (0, import_react.useState)(false);
	const onSubmit = (e) => {
		e.preventDefault();
		setSent(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border/70 bg-white/70",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-eyebrow",
					children: "Contact"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "section-title mx-auto mt-4 max-w-3xl",
					children: "Let’s discuss a project, partnership, or request."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-5 max-w-2xl text-sm leading-7 text-foreground/65 sm:text-base",
					children: "Use the form or reach out directly through the contact details below."
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-[1.05fr_0.95fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card rounded-[1.75rem] p-6 sm:p-8 lg:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "section-eyebrow",
						children: "Send a message"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-3xl font-semibold tracking-tight text-primary",
						children: "Get in touch"
					}),
					sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-14 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-semibold text-primary",
							children: "Thank you"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-md text-sm leading-7 text-foreground/65",
							children: "We've received your message and will be in touch shortly."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "mt-8 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "text",
								className: "modern-input"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60",
								children: "Email address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "email",
								className: "modern-input"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60",
								children: "Message"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								required: true,
								rows: 6,
								className: "modern-input resize-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "btn-primary w-full",
								children: ["Submit message", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card rounded-[1.75rem] p-6 sm:p-8 lg:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "section-eyebrow",
							children: "Contact details"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-3xl font-semibold tracking-tight text-primary",
							children: "Direct lines"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-6 space-y-6 text-sm text-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-1 h-5 w-5 shrink-0 text-[var(--gold)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-primary",
										children: "Head Office"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 leading-7 text-foreground/65",
										children: [
											"Office #601 Opal Tower,",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Burj Khalifa St, Business Bay,",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Dubai, United Arab Emirates",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"P.O. Box: 413155"
										]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mt-1 h-5 w-5 shrink-0 text-[var(--gold)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "tel:+97142249688",
										className: "transition-colors hover:text-primary",
										children: "+971 4 224 9688"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mt-1 h-5 w-5 shrink-0 text-[var(--gold)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "mailto:info@almullaholding.co",
										className: "transition-colors hover:text-primary",
										children: "info@almullaholding.co"
									})]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "surface-card overflow-hidden rounded-[1.75rem] p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: "Office Location",
						src: "https://www.google.com/maps?q=Opal+Tower+Business+Bay+Dubai&output=embed",
						className: "h-72 w-full rounded-[1.35rem]",
						loading: "lazy"
					})
				})]
			})]
		})
	})] });
}
//#endregion
export { Contact as component };
