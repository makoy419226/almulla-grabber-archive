export const COOKIE_CONSENT_OPEN_EVENT = "almulla:open-cookie-preferences";

export function openCookiePreferences() {
  window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT));
}
