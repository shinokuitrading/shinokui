import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import type { Locale } from "@/i18n/config";

type Props = {
  product: Product;
  locale: Locale;
  categoryLabels?: Record<string, string>;
  volumeLabel: string;
  abvLabel: string;
};

export function ProductCard({
  product,
  locale,
  categoryLabels,
  volumeLabel,
  abvLabel
}: Props) {
  const primaryName = locale === "ja" ? product.name_jp : product.name_zh;
  const secondaryName = locale === "ja" ? product.name_zh : product.name_jp;
  const categoryLabel = categoryLabels?.[product.category] ?? product.category;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col border border-oceanBrown/10 rounded-xl overflow-hidden bg-ivory/60 hover:bg-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oceanBrown/60"
    >
      <div className="relative aspect-[4/3] bg-oceanBrown/5">
        <Image
          src={product.image}
          alt={primaryName}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-center group-hover:scale-[1.02] transition-transform"
        />
      </div>
      <div className="px-4 py-4 space-y-1">
        <p className="text-xs uppercase tracking-[0.18em] text-textMuted">
          {categoryLabel}
        </p>
        <p className="text-sm font-semibold text-textDark">
          {primaryName}
        </p>
        <p className="text-xs text-textMuted">{secondaryName}</p>
        <p className="text-xs text-textMuted mt-1">
          {abvLabel} {product.abv}% / {volumeLabel} {product.volume_ml}ml
        </p>
      </div>
    </Link>
  );
}
