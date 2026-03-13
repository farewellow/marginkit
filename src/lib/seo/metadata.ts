import type { Metadata } from "next";

const SITE_NAME = "MarginKit";
const DEFAULT_SITE_URL = "https://marginkit.app";
const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
const SITE_URL = RAW_SITE_URL.endsWith("/") ? RAW_SITE_URL.slice(0, -1) : RAW_SITE_URL;

function toAbsoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function getCanonicalUrl(pathname: string): string {
  return toAbsoluteUrl(pathname);
}

interface BuildMetadataInput {
  title: string;
  description: string;
  pathname: string;
  imagePath?: string;
  twitterImagePath?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  pathname,
  imagePath,
  twitterImagePath,
  noIndex = false
}: BuildMetadataInput): Metadata {
  const url = getCanonicalUrl(pathname);
  const openGraphImage = toAbsoluteUrl(imagePath ?? siteConfig.defaultSocialImagePath);
  const twitterImage = toAbsoluteUrl(twitterImagePath ?? imagePath ?? siteConfig.defaultSocialImagePath);

  return {
    title: {
      absolute: title
    },
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: openGraphImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} social preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImage]
    },
    robots: noIndex
      ? {
          index: false,
          follow: false
        }
      : undefined
  };
}

export const siteConfig = {
  name: SITE_NAME,
  shortName: "MarginKit",
  url: SITE_URL,
  description:
    "MarginKit helps importers, resellers, and e-commerce sellers calculate landed cost, margin, reorder points, and inventory risk fast.",
  iconPath: "/icons/icon.svg",
  iconMaskablePath: "/icons/icon-maskable.svg",
  appleIconPath: "/apple-icon",
  manifestPath: "/manifest.webmanifest",
  defaultSocialImagePath: process.env.NEXT_PUBLIC_OG_IMAGE_PATH ?? "/opengraph-image"
};

export { toAbsoluteUrl };
