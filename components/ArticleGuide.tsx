import Image from "next/image";
import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { getProductBySlug } from "@/lib/products";
import styles from "./ArticleGuide.module.css";

export function ArticleGuide({
  title,
  date,
  children
}: {
  title: string;
  date: string;
  children: ReactNode;
}) {
  return (
    <article className={styles.guide}>
      <header className={styles.header}>
        <h1 className="font-serif">{title}</h1>
        <time dateTime={date}>{date}</time>
      </header>
      <div className={styles.content}>{children}</div>
    </article>
  );
}

export function ArticleFigure({
  src,
  alt,
  caption,
  width,
  height
}: {
  src: string;
  alt: string;
  caption: string;
  width: number | `${number}`;
  height: number | `${number}`;
}) {
  return (
    <figure className={styles.figure}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 800px) calc(100vw - 40px), 760px"
        className={styles.figureImage}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export async function ArticleProduct({
  slug,
  imageWidth,
  imageHeight,
  children
}: {
  slug: string;
  imageWidth: number | `${number}`;
  imageHeight: number | `${number}`;
  children: ReactNode;
}) {
  const product = getProductBySlug(slug);
  const locale = await getLocale();

  return (
    <div className={styles.product}>
      {product && (
        <Image
          src={product.image}
          alt={locale === "ja" ? product.name_jp : product.name_zh}
          width={imageWidth}
          height={imageHeight}
          sizes="128px"
          className={styles.productImage}
        />
      )}
      <div>{children}</div>
    </div>
  );
}
