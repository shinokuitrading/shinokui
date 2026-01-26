import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const product = getProductBySlug(params.slug);

  if (!product) return notFound();

  const primaryName = locale === "ja" ? product.name_jp : product.name_zh;
  const secondaryName = locale === "ja" ? product.name_zh : product.name_jp;
  const categoryLabel =
    (t.raw("products.categoryLabels") as Record<string, string>)?.[
      product.category
    ] ?? product.category;
  const description =
    locale === "ja"
      ? product.description_ja ?? product.description
      : product.description;
  const pairing =
    locale === "ja" ? product.pairing_ja ?? product.pairing : product.pairing;
  const serving =
    locale === "ja" ? product.serving_ja ?? product.serving : product.serving;

  const renderContent = (value?: string | string[]) => {
    if (!value) return null;
    if (Array.isArray(value)) {
      return (
        <ul className="text-sm text-textMuted leading-relaxed list-disc pl-4 space-y-1">
          {value.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }

    return (
      <p className="text-sm text-textMuted leading-relaxed">
        {value}
      </p>
    );
  };

  return (
    <Section>
      <div className="grid md:grid-cols-[2fr,3fr] gap-10 items-start">
        <div className="relative w-full aspect-[3/4] max-w-sm mx-auto rounded-3xl overflow-hidden bg-oceanBrown/5">
          <Image
            src={product.image}
            alt={primaryName}
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-contain object-bottom"
          />
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-textMuted">
            {categoryLabel}
          </p>
          <h1 className="text-xl font-serif text-textDark">
            {primaryName}
          </h1>
          <p className="text-sm text-textMuted mb-2">
            {secondaryName}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-textMuted mb-1">
                {t("products.abvLabel")}
              </p>
              <p className="text-textDark">{product.abv}%</p>
            </div>
            <div>
              <p className="text-xs text-textMuted mb-1">
                {t("products.volumeLabel")}
              </p>
              <p className="text-textDark">{product.volume_ml}ml</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-textMuted mb-1">
              {t("products.detailSpecs")}
            </p>
            {renderContent(description)}
          </div>

          <div>
            <p className="text-xs text-textMuted mb-1">
              {t("products.pairing")}
            </p>
            {renderContent(pairing)}
          </div>

          <div>
            <p className="text-xs text-textMuted mb-1">
              {t("products.serving")}
            </p>
            {renderContent(serving ?? t("products.servingNote"))}
          </div>

        </div>
      </div>
    </Section>
  );
}
