import { seoConfig } from "@/lib/seo";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Instituto de Informática - UFG",
    url: seoConfig.siteUrl,
    logo: `${seoConfig.siteUrl}${seoConfig.iconPath}`,
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Universidade Federal de Goiás",
      url: "https://ufg.br",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    inLanguage: "pt-BR",
    description: seoConfig.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Espaço das Profissões - Computação e Sociedade",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: {
      "@type": "EducationalOrganization",
      name: "Instituto de Informática - UFG",
      url: seoConfig.siteUrl,
    },
    location: {
      "@type": "Place",
      name: "Instituto de Informática - UFG",
      address: {
        "@type": "PostalAddress",
        addressCountry: "BR",
        addressRegion: "GO",
      },
    },
  },
];

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
