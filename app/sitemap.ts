import { MetadataRoute } from "next";
import { siteBaseUrl } from "@/lib/seo";
import { getAllProducts } from "@/lib/products";
import { getAllNews } from "@/lib/news";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteBaseUrl;
  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/brand",
    "/products",
    "/news"
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.6
  }));

  const productPages = getAllProducts().map((p) => ({
    url: `${base}/products/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5
  }));

  const brandPages: MetadataRoute.Sitemap = [
    "/brand/tsukinoi",
    "/brand/shine-muscat"
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: 0.5
  }));

  const newsItems = await getAllNews();
  const newsPages = newsItems.map((n) => ({
    url: `${base}/news/${n.slug}`,
    ...(n.date ? { lastModified: n.date } : {}),
    changeFrequency: "weekly" as const,
    priority: 0.5
  }));

  return [...staticPages, ...brandPages, ...productPages, ...newsPages];
}
