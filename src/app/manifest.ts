import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#0ea5e9",
    lang: "en",
    icons: [
      {
        src: siteConfig.iconPath,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: siteConfig.iconMaskablePath,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      },
      {
        src: siteConfig.appleIconPath,
        sizes: "180x180",
        type: "image/png"
      }
    ]
  };
}
