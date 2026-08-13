import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { defaultLocale, Locale } from "@/i18n/config";

const NEWS_DIR = path.join(process.cwd(), "data", "news");

export type NewsMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
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

    const rawDate = (data as any).date;
    let dateString = "";

    if (rawDate instanceof Date) {
      dateString = rawDate.toISOString().slice(0, 10);
    } else if (typeof rawDate === "string") {
      dateString = rawDate;
    }

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
      excerpt
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

  const mdx = await compileMDX({
    source: content,
    options: { parseFrontmatter: false }
  });

  const rawDate = (data as any).date;
  let dateString = "";

  if (rawDate instanceof Date) {
    dateString = rawDate.toISOString().slice(0, 10);
  } else if (typeof rawDate === "string") {
    dateString = rawDate;
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
        : getLocalizedValue(data, locale, "excerpt", "")
    },
    content: mdx.content
  };
}
