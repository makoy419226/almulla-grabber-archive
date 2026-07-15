import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Menu, f as ArrowUpRight, l as ChevronDown, r as Phone, s as Mail, t as X } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteLayout-iR5G3PbT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var logo_default = "/assets/logo-DdshJGCk.png";
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function AlmullaLogo({ className, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex items-center gap-3", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("shrink-0 overflow-hidden", compact ? "h-12 w-9" : "h-[3.1rem] w-[8.9rem]"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: logo_default,
				alt: "AlMulla Holding",
				className: cn("select-none", compact ? "h-full w-auto max-w-none" : "h-full w-full object-contain"),
				draggable: false
			})
		})
	});
}
function SiteLayout({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [bizOpen, setBizOpen] = (0, import_react.useState)(false);
	const pathname = useLocation({ select: (location) => location.pathname });
	const selectedBusiness = pathname === "/businesses/healthcare" ? "Healthcare" : pathname === "/businesses/hospitality" ? "Hospitality" : "Businesses";
	const isBusinessRoute = pathname.startsWith("/businesses/");
	const linkCls = "relative text-sm font-medium text-white/90 transition-colors hover:text-[var(--gold)] after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-[var(--gold)] after:transition-all after:duration-200 hover:after:w-full";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-[#7a1720] bg-[#831823] shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "shrink-0 rounded-md bg-white/95 px-3 py-2 shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlmullaLogo, { className: "gap-2 sm:gap-3" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden items-center gap-10 md:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: linkCls,
									activeProps: { className: `${linkCls} text-[var(--gold)] after:w-full` },
									children: "Home"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/about-us",
									className: linkCls,
									activeProps: { className: `${linkCls} text-[var(--gold)] after:w-full` },
									children: "About"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									onMouseEnter: () => setBizOpen(true),
									onMouseLeave: () => setBizOpen(false),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: cn(linkCls, "flex items-center gap-1 border-0 bg-transparent p-0", isBusinessRoute && "text-[var(--gold)] after:w-full"),
										"aria-expanded": bizOpen,
										"aria-haspopup": "menu",
										onClick: () => setBizOpen((current) => !current),
										children: [
											selectedBusiness,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" })
										]
									}), bizOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute left-0 top-full pt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "surface-card w-64 overflow-hidden rounded-2xl p-2",
											role: "menu",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/businesses/healthcare",
												className: "flex items-center justify-between rounded-xl px-4 py-3 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-primary",
												activeProps: { className: "bg-secondary text-primary" },
												onClick: () => setBizOpen(false),
												children: ["Healthcare", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 opacity-60" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/businesses/hospitality",
												className: "flex items-center justify-between rounded-xl px-4 py-3 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-primary",
												activeProps: { className: "bg-secondary text-primary" },
												onClick: () => setBizOpen(false),
												children: ["Hospitality", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 opacity-60" })]
											})]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact-us",
									className: linkCls,
									activeProps: { className: `${linkCls} text-[var(--gold)] after:w-full` },
									children: "Contact"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 text-primary shadow-sm transition-transform hover:-translate-y-0.5 md:hidden",
							onClick: () => setOpen(!open),
							"aria-label": "Menu",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						})
					]
				}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border/70 bg-background/95 md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "rounded-xl px-4 py-3 text-sm font-medium hover:bg-secondary",
								onClick: () => setOpen(false),
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about-us",
								className: "rounded-xl px-4 py-3 text-sm font-medium hover:bg-secondary",
								onClick: () => setOpen(false),
								children: "About"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/businesses/healthcare",
								className: "rounded-xl px-4 py-3 text-sm font-medium hover:bg-secondary",
								onClick: () => setOpen(false),
								children: "Healthcare"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/businesses/hospitality",
								className: "rounded-xl px-4 py-3 text-sm font-medium hover:bg-secondary",
								onClick: () => setOpen(false),
								children: "Hospitality"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact-us",
								className: "rounded-xl px-4 py-3 text-sm font-medium hover:bg-secondary",
								onClick: () => setOpen(false),
								children: "Contact"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-20 border-t border-border/70 bg-white/60 backdrop-blur-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.35fr_1fr_1fr] lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlmullaLogo, {
								compact: true,
								className: "items-start"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xl text-sm leading-7 text-foreground/70",
								children: "AlMulla Holding Group brings together healthcare and hospitality platforms shaped around quality, consistency, and long-term value."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-card rounded-2xl p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold uppercase tracking-[0.22em] text-primary",
								children: "Contact"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-sm leading-7 text-foreground/70",
								children: [
									"Office #601 Opal Tower,",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Burj Khalifa St, Business Bay,",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Dubai, United Arab Emirates",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"P.O. Box: 413155"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-card rounded-2xl p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold uppercase tracking-[0.22em] text-primary",
								children: "Get in Touch"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "tel:+97142249688",
									className: "flex items-center gap-2 transition-colors hover:text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-[var(--gold)]" }), " +971 4 224 9688"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "mailto:info@almullaholding.co",
									className: "flex items-center gap-2 transition-colors hover:text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-[var(--gold)]" }), " info@almullaholding.co"]
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border/70 px-4 py-4 text-center text-xs text-foreground/55 sm:px-6 lg:px-8",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" AlMulla Holding Group. All rights reserved."
					]
				})]
			})
		]
	});
}
//#endregion
export { SiteLayout as n, AlmullaLogo as t };
