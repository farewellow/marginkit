"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

import { analyticsConfig, isAnalyticsEnabled, trackPageView } from "@/lib/analytics";

export function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  useEffect(() => {
    if (!isAnalyticsEnabled) return;

    const pathWithQuery = queryString ? `${pathname}?${queryString}` : pathname;
    trackPageView(pathWithQuery);
  }, [pathname, queryString]);

  if (analyticsConfig.provider === "ga4" && analyticsConfig.gaMeasurementId) {
    const gaScriptSrc = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaMeasurementId}`;
    const gaInitScript = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '${analyticsConfig.gaMeasurementId}', { send_page_view: false });
    `;

    return (
      <>
        <Script src={gaScriptSrc} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {gaInitScript}
        </Script>
      </>
    );
  }

  if (analyticsConfig.provider === "posthog") {
    // TODO: Add PostHog bootstrap script here when enabling NEXT_PUBLIC_ANALYTICS_PROVIDER=posthog.
    return null;
  }

  if (analyticsConfig.provider !== "plausible" || !analyticsConfig.plausibleDomain) {
    return null;
  }

  // TODO: Replace with a first-party proxied script URL if you prefer not to use the default Plausible CDN path.
  return (
    <Script
      strategy="afterInteractive"
      data-domain={analyticsConfig.plausibleDomain}
      src="https://plausible.io/js/script.js"
    />
  );
}
