export type AnalyticsEventName =
  | "calculator_used"
  | "csv_uploaded"
  | "pro_cta_clicked"
  | "category_opened"
  | "related_tool_clicked";

type AnalyticsProvider = "none" | "ga4" | "plausible" | "posthog";

interface AnalyticsPayload {
  [key: string]: string | number | boolean | undefined;
}

interface PlausibleOptions {
  props?: Record<string, string | number | boolean>;
  u?: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (eventName: string, options?: PlausibleOptions) => void;
    posthog?: {
      capture: (eventName: string, properties?: Record<string, unknown>) => void;
    };
  }
}

const DEFAULT_GA4_MEASUREMENT_ID = "G-EGQ3SWJGGX";

function parseProvider(value: string | undefined): AnalyticsProvider {
  if (value === "none" || value === "ga4" || value === "plausible" || value === "posthog") {
    return value;
  }

  return "ga4";
}

function toSerializablePayload(payload?: AnalyticsPayload): Record<string, string | number | boolean> {
  if (!payload) return {};

  return Object.fromEntries(
    Object.entries(payload).filter((entry): entry is [string, string | number | boolean] => entry[1] !== undefined)
  );
}

function getPageUrl(pathname: string): string {
  if (pathname.startsWith("http://") || pathname.startsWith("https://")) {
    return pathname;
  }

  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${window.location.origin}${normalized}`;
}

export const analyticsConfig = {
  provider: parseProvider(process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER),
  gaMeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? DEFAULT_GA4_MEASUREMENT_ID,
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? ""
};

export const isAnalyticsEnabled = analyticsConfig.provider !== "none";

export function trackEvent(name: AnalyticsEventName, payload?: AnalyticsPayload) {
  if (typeof window === "undefined") return;

  const serializedPayload = toSerializablePayload(payload);

  if (analyticsConfig.provider === "ga4" && analyticsConfig.gaMeasurementId && typeof window.gtag === "function") {
    window.gtag("event", name, serializedPayload);
    return;
  }

  if (analyticsConfig.provider === "plausible" && typeof window.plausible === "function") {
    window.plausible(name, { props: serializedPayload });
    return;
  }

  if (analyticsConfig.provider === "posthog" && window.posthog) {
    window.posthog.capture(name, serializedPayload);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics:noop]", name, serializedPayload);
  }
}

export function trackPageView(pathname: string) {
  if (typeof window === "undefined" || !isAnalyticsEnabled) return;

  const pageUrl = getPageUrl(pathname);

  if (analyticsConfig.provider === "ga4" && analyticsConfig.gaMeasurementId && typeof window.gtag === "function") {
    window.gtag("config", analyticsConfig.gaMeasurementId, {
      page_path: pathname,
      page_location: pageUrl
    });
    return;
  }

  if (analyticsConfig.provider === "plausible" && typeof window.plausible === "function") {
    window.plausible("pageview", { u: pageUrl });
    return;
  }

  if (analyticsConfig.provider === "posthog" && window.posthog) {
    window.posthog.capture("$pageview", { $current_url: pageUrl });
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics:noop]", "pageview", { url: pageUrl });
  }
}
