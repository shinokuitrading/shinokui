import type { Locale } from "@/i18n/config";
import type { PriceDetails, ProductPriceVariant } from "@/lib/products";

type PricingLabels = {
  title: string;
  unit: string;
  regular: string;
  discount: string;
  case: string;
  caseWithQuantity: (count: number) => string;
};

type Props = {
  variants: ProductPriceVariant[];
  locale: Locale;
  volumeMl: number;
  labels: PricingLabels;
};

function formatPrice(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

function PriceAmounts({
  price,
  labels
}: {
  price: PriceDetails;
  labels: Pick<PricingLabels, "regular" | "discount">;
}) {
  const isDiscounted = price.original !== undefined;

  return (
    <div className="ml-auto flex flex-wrap items-end justify-end gap-x-3 gap-y-1">
      <div>
        <span className="block text-[0.65rem] leading-none text-textMuted">
          {isDiscounted ? labels.discount : labels.regular}
        </span>
        <strong className="mt-1 block whitespace-nowrap text-lg leading-none tabular-nums text-oceanBrown sm:text-xl">
          {formatPrice(price.current)}
        </strong>
      </div>

      {isDiscounted ? (
        <div>
          <span className="block text-[0.65rem] leading-none text-textMuted">
            {labels.regular}
          </span>
          <del className="mt-1 block whitespace-nowrap text-xs leading-none tabular-nums text-textMuted/75 decoration-textMuted/70">
            {formatPrice(price.original!)}
          </del>
        </div>
      ) : null}
    </div>
  );
}

export function ProductPricing({
  variants,
  locale,
  volumeMl,
  labels
}: Props) {
  return (
    <aside
      aria-labelledby="product-pricing-title"
      className="mt-5 rounded-2xl border border-oceanBrown/20 bg-ivory/90 p-4 shadow-sm sm:p-5"
    >
      <div className="flex items-baseline justify-between gap-3">
        <p
          id="product-pricing-title"
          className="font-serif text-sm text-textDark"
        >
          {labels.title}
        </p>
        <span className="text-[0.6rem] uppercase tracking-[0.18em] text-textMuted">
          TWD
        </span>
      </div>

      <div className="mt-3 space-y-3">
        {variants.map((variant, index) => {
          const variantLabel =
            locale === "ja"
              ? variant.label_ja ?? variant.label_zh
              : variant.label_zh;
          const caseLabel = variant.case.quantity
            ? labels.caseWithQuantity(variant.case.quantity)
            : labels.case;

          return (
            <div
              key={`${variantLabel ?? "default"}-${index}`}
              className="overflow-hidden rounded-xl border border-oceanBrown/15 bg-white/55"
            >
              {variantLabel ? (
                <p className="border-b border-oceanBrown/10 bg-oceanBrown/5 px-3 py-2 text-xs font-medium text-oceanBrown sm:px-4">
                  {variantLabel}
                </p>
              ) : null}

              <div className="divide-y divide-oceanBrown/10 px-3 sm:px-4">
                <div className="flex flex-wrap items-end justify-between gap-3 py-3">
                  <div>
                    <p className="text-xs font-medium text-textDark">
                      {labels.unit}
                    </p>
                    <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.08em] text-textMuted">
                      {volumeMl}ML
                    </p>
                  </div>
                  <PriceAmounts price={variant.unit} labels={labels} />
                </div>

                <div className="flex flex-wrap items-end justify-between gap-3 py-3">
                  <p className="text-xs font-medium text-textDark">
                    {caseLabel}
                  </p>
                  <PriceAmounts price={variant.case} labels={labels} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
