import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { ManufacturerProductDetails } from "@/components/ManufacturerProductDetails";
import { ProductPricing } from "@/components/ProductPricing";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import {
  absoluteUrl,
  brandName,
  createSeoMetadata,
  getProductSeo,
  organizationName,
  productsSeo,
  siteBaseUrl
} from "@/lib/seo";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);
  const seo = getProductSeo(params.slug);

  if (!product || !seo) {
    return createSeoMetadata({
      title: "找不到商品｜信億尉貿易有限公司",
      description: "此商品頁面不存在。",
      path: `/products/${params.slug}`,
      noIndex: true
    });
  }

  return createSeoMetadata({
    title: seo.title,
    description: seo.description,
    path: `/products/${product.slug}`,
    image: product.image,
    imageAlt: seo.imageAlt
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const product = getProductBySlug(params.slug);

  if (!product) return notFound();

  const seo = getProductSeo(product.slug);
  if (!seo) return notFound();

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
  const hasManufacturerSpecifications = Boolean(
    product.manufacturer_details?.specifications?.length
  );

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

  const productUrl = absoluteUrl(`/products/${product.slug}`);
  const category = product.category.includes("梅酒") ? "梅酒" : "日本酒";
  const offers = (product.pricing ?? []).flatMap((variant) => {
    const variantName = variant.label_zh ? `（${variant.label_zh}）` : "";
    const seller = {
      "@type": "Organization",
      name: organizationName,
      url: `${siteBaseUrl}/`
    };

    return [
      {
        "@type": "Offer",
        name: `${seo.h1}${variantName}－單瓶 ${product.volume_ml}ml`,
        price: variant.unit.current,
        priceCurrency: "TWD",
        url: productUrl,
        seller
      },
      {
        "@type": "Offer",
        name: `${seo.h1}${variantName}－整箱${
          variant.case.quantity ? ` ${variant.case.quantity} 瓶` : ""
        }`,
        price: variant.case.current,
        priceCurrency: "TWD",
        url: productUrl,
        seller
      }
    ];
  });

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "@id": `${productUrl}#product`,
            name: seo.h1,
            alternateName: seo.alternateNames,
            image: [absoluteUrl(product.image)],
            description: seo.description,
            brand: { "@type": "Brand", name: brandName },
            category,
            url: productUrl,
            offers
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "首頁",
                item: `${siteBaseUrl}/`
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "月之井清酒產品",
                item: absoluteUrl(productsSeo.path)
              },
              {
                "@type": "ListItem",
                position: 3,
                name: seo.h1,
                item: productUrl
              }
            ]
          }
        ]}
      />
      <Section>
      <div className="grid items-start gap-10 lg:grid-cols-[2fr,3fr]">
        <div className="mx-auto w-full max-w-sm">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-oceanBrown/5">
            <Image
              src={product.image}
              alt={locale === "zh-TW" ? seo.imageAlt : primaryName}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-contain object-bottom"
            />
          </div>

          {product.pricing?.length ? (
            <ProductPricing
              variants={product.pricing}
              locale={locale}
              volumeMl={product.volume_ml}
              labels={{
                title: t("products.pricingTitle"),
                unit: t("products.unitPrice"),
                regular: t("products.regularPrice"),
                discount: t("products.discountPrice"),
                preDiscount: t("products.preDiscountPrice"),
                caseRegular: t("products.caseRegularPrice"),
                casePreDiscount: t("products.casePreDiscountPrice"),
                caseDiscount: t("products.caseDiscountPrice"),
                case: t("products.casePrice"),
                caseWithQuantity: (count) =>
                  t("products.casePriceWithQuantity", { count })
              }}
            />
          ) : null}
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-textMuted">
            {categoryLabel}
          </p>
          <h1 className="text-xl font-serif text-textDark">
            {locale === "zh-TW" ? seo.h1 : primaryName}
          </h1>
          <p className="text-sm text-textMuted mb-2">
            {secondaryName}
          </p>

          {!hasManufacturerSpecifications && (
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
          )}

          {product.manufacturer_details ? (
            <ManufacturerProductDetails
              details={product.manufacturer_details}
              locale={locale}
              title={t("products.descriptionTitle")}
              subtitle={t("products.descriptionSubtitle")}
              specificationsLabel={t("products.manufacturerSpecifications")}
              staffVoiceTitle={t("products.staffVoice")}
            />
          ) : (
            <>
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
            </>
          )}

        </div>
      </div>
      </Section>
    </>
  );
}
