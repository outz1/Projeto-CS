import type { Metadata } from "next";

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
};

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const seoConfig = {
  siteName: "Espaço das Profissões",
  shortName: "Espaço Profissões",
  defaultTitle: "Espaço das Profissões",
  titleTemplate: "%s | Espaço das Profissões",
  description: "Espaço das Profissões - Projetos para apresentar cursos, áreas e entidades.",
  locale: "pt_BR",
  themeColor: "#0b1d4d",
  keywords: [
    "instituto de informática",
    "espaço das profissões",
    "computação",
    "sistemas de informação",
    "engenharia de software",
    "ufg",
    "espaço das profissões ufg",
    "tecnologia",
    "ciência da computação",
    "áreas correlatas",
    "entidades estudantis",
    "CEIA",
  ],
  iconPath: "/favicon/inf_vet2.svg",
  ogImagePath: "/favicon/inf_vet.svg",
  siteUrl: configuredSiteUrl?.startsWith("http")
    ? configuredSiteUrl
    : "http://localhost:3000",
};

export const metadataBase = new URL(seoConfig.siteUrl);

export const defaultMetadata: Metadata = {
  metadataBase,
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: seoConfig.locale,
    url: "/",
    siteName: seoConfig.siteName,
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    images: [
      {
        url: seoConfig.ogImagePath,
        alt: seoConfig.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    images: [seoConfig.ogImagePath],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: seoConfig.iconPath, type: "image/svg+xml" }],
    shortcut: [seoConfig.iconPath],
    apple: [seoConfig.iconPath],
  },
};

export function buildPageMetadata({
  title,
  description,
  path,
}: BuildPageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: seoConfig.siteName,
      locale: seoConfig.locale,
      type: "website",
      images: [
        {
          url: seoConfig.ogImagePath,
          alt: seoConfig.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seoConfig.ogImagePath],
    },
  };
}
