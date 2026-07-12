import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { projects } from "@/data/portfolio";
import { industries } from "@/data/industries";
import { posts } from "@/data/insights";
import { competitors } from "@/data/competitors";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    "/",
    "/about",
    "/services",
    "/industries",
    "/portfolio",
    "/pricing",
    "/insights",
    "/testimonials",
    "/careers",
    "/websites-for-restaurants",
    "/tools",
    "/tools/website-audit",
    "/tools/invoice-generator",
    "/security",
    "/faq",
    "/contact",
    "/book-consultation",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.includes("/services") ? 0.9 : 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services
    .filter((s) => s.href.startsWith("/services/"))
    .map((s) => ({
      url: `${base}${s.href}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    }));

  const portfolioRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${base}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const insightRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/insights/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const versusRoutes: MetadataRoute.Sitemap = competitors.map((c) => ({
    url: `${base}/vs/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [
    ...routes,
    ...serviceRoutes,
    ...portfolioRoutes,
    ...industryRoutes,
    ...insightRoutes,
    ...versusRoutes,
  ];
}
