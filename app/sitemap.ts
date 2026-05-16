import type { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/arcade", priority: 0.8 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${seoConfig.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  }));
}
