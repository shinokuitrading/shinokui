import { MetadataRoute } from "next";
import { siteBaseUrl } from "@/lib/seo";
import { getAllProducts } from "@/lib/products";
import { getAllNews } from "@/lib/news";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteBaseUrl;
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/products",
    "/news",
    "/privacy"
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.6
  }));

  const productPages = getAllProducts().map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5
  }));

  const newsItems = await getAllNews();
  const newsPages = newsItems.map((n) => ({
    url: `${base}/news/${n.slug}`,
    lastModified: n.date || now,
    changeFrequency: "weekly" as const,
    priority: 0.5
  }));

  return [...staticPages, ...productPages, ...newsPages];
}
