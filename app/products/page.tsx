import { Section } from "@/components/Section";
import { getAllProducts, getCategories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";

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
    <Section>
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl font-serif text-textDark mb-2">
            {t("products.title")}
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
  );
}
