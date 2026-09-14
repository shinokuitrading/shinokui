import Link from "next/link";

export type RelatedReadingItem = {
  href: string;
  title: string;
};

export function RelatedReading({
  items,
  title = "延伸閱讀"
}: {
  items: RelatedReadingItem[];
  title?: string;
}) {
  return (
    <aside className="mt-10 border-t border-oceanBrown/20 pt-6">
      <h2 className="font-serif text-lg text-textDark">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-oceanBrown hover:underline"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
