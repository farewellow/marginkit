import type { Metadata } from "next";
import { Suspense } from "react";

import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig, toAbsoluteUrl } from "@/lib/seo/metadata";

import "./globals.css";

const defaultSocialImage = toAbsoluteUrl(siteConfig.defaultSocialImagePath);

export const metadata: Metadata = {
  title: {
    default: "MarginKit | Cost, Margin & Inventory Calculators for Sellers",
    template: "%s | MarginKit"
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/"
  },
  manifest: siteConfig.manifestPath,
  icons: {
    icon: [
      { url: siteConfig.iconPath, type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "512x512" }
    ],
    shortcut: [{ url: siteConfig.iconPath, type: "image/svg+xml" }],
    apple: [{ url: siteConfig.appleIconPath, type: "image/png", sizes: "180x180" }]
  },
  openGraph: {
    title: "MarginKit",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: defaultSocialImage,
        width: 1200,
        height: 630,
        alt: "MarginKit social preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MarginKit",
    description: siteConfig.description,
    images: [defaultSocialImage]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Suspense fallback={null}>
          <AnalyticsProvider />
        </Suspense>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
