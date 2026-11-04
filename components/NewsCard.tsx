import Image from "next/image";
import Link from "next/link";
import type { NewsMeta } from "@/lib/news";
import styles from "./NewsCard.module.css";

type Props = {
  item: NewsMeta;
  labelReadMore: string;
};

export function NewsCard({ item, labelReadMore }: Props) {
  return (
    <article className={styles.card}>
      <Link href={`/news/${item.slug}`} className={styles.link} aria-label={item.title}>
        <div className={styles.media} data-fit={item.thumbnail?.fit} aria-hidden="true">
          {item.thumbnail && (
            <Image
              src={encodeURI(item.thumbnail.src)}
              alt=""
              fill
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1152px) calc((100vw - 120px) / 2), 516px"
              className={styles.image}
              style={{ objectPosition: item.thumbnail.position ?? "50% 50%" }}
            />
          )}
        </div>
        <div className={styles.content}>
          <time className={styles.date} dateTime={item.date || undefined}>{item.date}</time>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.excerpt}>{item.excerpt}</p>
          <span className={styles.readMore}>{labelReadMore} <span aria-hidden="true">→</span></span>
        </div>
      </Link>
    </article>
  );
}
