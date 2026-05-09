import type { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seoConfig.siteName,
    short_name: seoConfig.shortName,
    description: seoConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: seoConfig.themeColor,
    icons: [
      {
        src: seoConfig.iconPath,
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
