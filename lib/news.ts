import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { defaultLocale, Locale } from "@/i18n/config";
import { ArticleFigure, ArticleProduct, ArticleProductList, ArticleProductLink } from "@/components/ArticleGuide";

const NEWS_DIR = path.join(process.cwd(), "data", "news");

export type NewsMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  seoTitle?: string;
  image?: string;
  dateModified?: string;
};

async function resolveNewsPath(slug: string, locale: Locale) {
  const defaultPath = path.join(NEWS_DIR, `${slug}.mdx`);

  if (locale === "ja") {
    const localizedPath = path.join(NEWS_DIR, `${slug}.ja.mdx`);
    try {
      await fs.access(localizedPath);
      return { path: localizedPath, localized: true };
    } catch {
      return { path: defaultPath, localized: false };
    }
  }

  return { path: defaultPath, localized: false };
}

function getLocalizedValue(
  data: any,
  locale: Locale,
  key: "title" | "excerpt",
  fallback: string
) {
  if (locale === "ja") {
    return data?.[`${key}_ja`] ?? data?.[key] ?? fallback;
  }
  return data?.[key] ?? fallback;
}

function getNewsDate(value: unknown, slug: string, field: "date" | "dateModified") {
  if (value === undefined && field === "dateModified") return undefined;

  const date = value instanceof Date && Number.isFinite(value.getTime())
    ? value.toISOString().slice(0, 10)
    : value;

  // Frontmatter dates use YYYY-MM-DD. Reject invalid calendar dates as well.
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const parsed = new Date(`${date}T00:00:00.000Z`);
    if (Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date) {
      return date;
    }
  }

  console.warn(`[news] ${slug}: missing or invalid ${field}; ignoring this date.`);
  return undefined;
}

export async function getAllNews(
  locale: Locale = defaultLocale
): Promise<NewsMeta[]> {
  const files = (await fs.readdir(NEWS_DIR)).filter(
    (file) => file.endsWith(".mdx") && !file.endsWith(".ja.mdx")
  );
  const posts: NewsMeta[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;
    const slug = file.replace(/\.mdx$/, "");
    const resolved = await resolveNewsPath(slug, locale);
    const raw = await fs.readFile(resolved.path, "utf8");
    const { data } = matter(raw);

    const dateString = getNewsDate(data.date, slug, "date") ?? "";
    const dateModified = getNewsDate(data.dateModified, slug, "dateModified");

    const title = resolved.localized
      ? (data as any).title ?? slug
      : getLocalizedValue(data, locale, "title", slug);
    const excerpt = resolved.localized
      ? (data as any).excerpt ?? ""
      : getLocalizedValue(data, locale, "excerpt", "");

    const meta = {
      slug,
      title,
      date: dateString,
      excerpt,
      seoTitle: (data as any).seoTitle,
      image: (data as any).image,
      dateModified
    };

    posts.push(meta);
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getNewsBySlug(
  slug: string,
  locale: Locale = defaultLocale
) {
  const resolved = await resolveNewsPath(slug, locale);
  const raw = await fs.readFile(resolved.path, "utf8");

  const { content, data } = matter(raw);
  const layout = data.layout === "guide" ? ("guide" as const) : undefined;

  const mdx = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
    components: layout === "guide"
      ? { ArticleFigure, ArticleProduct, ArticleProductList, ArticleProductLink }
      : undefined
  });

  const rawDate = (data as any).date;
  let dateString = "";

  if (rawDate instanceof Date) {
    dateString = rawDate.toISOString().slice(0, 10);
  } else if (typeof rawDate === "string") {
    dateString = rawDate;
  }

  const rawDateModified = (data as any).dateModified;
  let dateModified = "";

  if (rawDateModified instanceof Date) {
    dateModified = rawDateModified.toISOString().slice(0, 10);
  } else if (typeof rawDateModified === "string") {
    dateModified = rawDateModified;
  }

  return {
    meta: {
      slug,
      title: resolved.localized
        ? (data as any).title ?? slug
        : getLocalizedValue(data, locale, "title", slug),
      date: dateString,
      excerpt: resolved.localized
        ? (data as any).excerpt ?? ""
        : getLocalizedValue(data, locale, "excerpt", ""),
      seoTitle: (data as any).seoTitle,
      image: (data as any).image,
      dateModified: dateModified || undefined,
      layout,
      showUpdated: data.showUpdated === true
    },
    content: mdx.content
  };
}
