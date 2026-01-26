import Link from "next/link";
import type { NewsMeta } from "@/lib/news";
type Props = {
  item: NewsMeta;
  labelReadMore: string;
};

export function NewsCard({ item, labelReadMore }: Props) {
  return (
    <article className="border border-oceanBrown/10 rounded-xl px-4 py-4 bg-ivory/60 hover:bg-ivory transition-colors">
      <p className="text-xs text-textMuted mb-1">
        {item.date}
      </p>
      <h3 className="text-sm font-semibold text-textDark mb-1">
        {item.title}
      </h3>
      <p className="text-sm text-textMuted mb-2">
        {item.excerpt}
      </p>
      <Link
        href={`/news/${item.slug}`}
        className="text-xs text-oceanBrown hover:underline tracking-[0.16em] uppercase"
      >
        {labelReadMore}
      </Link>
    </article>
  );
}
