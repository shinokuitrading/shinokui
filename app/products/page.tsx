import { Section } from "@/components/Section";
import { getAllProducts, getCategories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, createSeoMetadata, productsSeo } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata(productsSeo);

export default async function ProductsPage({
  searchParams
}: {
  searchParams: { category?: string };
}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const all = getAllProducts();
  const categories = getCategories();
  const category = searchParams.category || "all";
  const categoryLabels = t.raw("products.categoryLabels") as Record<
    string,
    string
  >;

  const filtered =
    category === "all"
      ? all
      : all.filter((p) => p.category === category);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: productsSeo.title,
          description: productsSeo.description,
          url: absoluteUrl(productsSeo.path),
          inLanguage: "zh-Hant-TW",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: all.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: absoluteUrl(`/products/${product.slug}`),
              name: product.name_zh
            }))
          }
        }}
      />
      <Section>
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl font-serif text-textDark mb-2">
            {locale === "zh-TW" ? "月之井清酒產品" : t("products.title")}
          </h1>
        </div>
        <CategoryFilter
          categories={categories}
          category={category}
          label={t("products.filterType")}
          allLabel={t("products.filterCategoryAll")}
          labels={categoryLabels}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProductCard
            key={p.slug}
            product={p}
            locale={locale}
            categoryLabels={categoryLabels}
            volumeLabel={t("products.volumeLabel")}
            abvLabel={t("products.abvLabel")}
          />
        ))}
      </div>
      </Section>
    </>
  );
}
