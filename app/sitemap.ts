import type { MetadataRoute } from "next";

const baseUrl = "https://murumaster.ee";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/et`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ru`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
