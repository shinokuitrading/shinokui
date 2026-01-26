import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { getTranslations } from "next-intl/server";

export default async function BrandPage() {
  const t = await getTranslations();

  const brands = [
    {
      slug: "tsukinoi",
      title: t("brandIntro.cardTitle"),
      image: "/images/tsukinoi_logo.jpeg"
    }
  ];

  return (
    <Section>
      <div className="mb-6">
        <h1 className="text-xl font-serif text-textDark mb-2">
          {t("brandIntro.title")}
        </h1>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brand/${brand.slug}`}
            className="group flex flex-col border border-oceanBrown/10 rounded-xl overflow-hidden bg-ivory/60 hover:bg-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oceanBrown/60"
          >
            <div className="relative aspect-[4/3] bg-oceanBrown/5">
              <Image
                src={brand.image}
                alt={brand.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-contain p-6"
              />
            </div>
            <div className="px-4 py-4 space-y-1">
              <p className="text-sm font-semibold text-textDark">
                {brand.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
