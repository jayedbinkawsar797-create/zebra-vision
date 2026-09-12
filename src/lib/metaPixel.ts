/**
 * Meta Pixel Tracking Helper for Zebra Golf Cart
 * Pixel ID: 452282614546759
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/**
 * Track standard Meta Pixel events (PageView, Lead, Contact, Schedule, ViewContent, etc.)
 */
export const trackPixelEvent = (event: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (params) {
      window.fbq("track", event, params);
    } else {
      window.fbq("track", event);
    }
  }
};

/**
 * Track custom Meta Pixel events
 */
export const trackPixelCustom = (event: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (params) {
      window.fbq("trackCustom", event, params);
    } else {
      window.fbq("trackCustom", event);
    }
  }
};
