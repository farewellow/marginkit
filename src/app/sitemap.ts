import type { MetadataRoute } from "next";

import { categoryDefinitions, tools } from "@/data/tools";
import { siteConfig } from "@/lib/seo/metadata";

const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/tools",
    "/guides",
    "/about",
    "/privacy",
    "/terms",
    "/contact",
    "/how-to-calculate-landed-cost-for-imported-products",
    "/how-discounts-affect-profit-margin",
    "/how-to-calculate-reorder-point-with-lead-time",
    ...categoryDefinitions.map((category) => `/${category.slug}`)
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: BUILD_DATE,
    changeFrequency: path === "" ? "daily" : path === "/tools" || path === "/guides" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/tools" ? 0.9 : path === "/guides" ? 0.85 : path.includes("-tools") ? 0.85 : 0.75
  }));

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${siteConfig.url}/tools/${tool.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "weekly",
    priority: 0.8
  }));

  return [...staticPages, ...toolPages];
}
