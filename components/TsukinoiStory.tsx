import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./TsukinoiStory.module.css";

type StorySection = { heading: string; body: string[] };

// Copy is brand-approved. Render these strings verbatim, in their original order.
export function TsukinoiStory({
  title,
  intro,
  sections,
  children
}: {
  title: string;
  intro: string;
  sections: StorySection[];
  children: ReactNode;
}) {
  const media = [
    <div key="logo" className={styles.logo}>
      <Image src="/images/tsukinoi_logo.jpeg" alt={title} width={1351} height={1351} sizes="(min-width: 1024px) 380px, 70vw" />
    </div>,
    <Image key="sea" className={styles.landscape} src="/images/news/tsukinoi/tsukinoi-seaside-sake.png" alt="窗邊木桌上的米色酒器與海面情境示意" width={1536} height={1024} sizes="(min-width: 1024px) 45vw, 100vw" />,
    <div key="wanotsuki" className={styles.products}>
      <Image src={encodeURI("/images/和の月39.jpg")} alt="和の月39的藍色酒瓶與金色盒裝" width={2787} height={4631} sizes="(min-width: 1024px) 300px, 70vw" />
    </div>,
    <div key="hikoichi" className={`${styles.products} ${styles.pair}`}>
      <Image src={encodeURI("/images/彦市 純米大吟醸.jpg")} alt="彦市純米大吟釀酒瓶" width={1607} height={4823} sizes="(min-width: 1024px) 180px, 40vw" />
      <Image src={encodeURI("/images/彦市純吟.jpg")} alt="彦市純米吟釀酒瓶" width={1437} height={4359} sizes="(min-width: 1024px) 180px, 40vw" />
    </div>
  ];

  return (
    <article className={styles.story}>
      <div className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/images/brand/tsukinoi/moonlit-sea.jpg"
          alt="月光映照波浪的海面，AI 氛圍示意"
          width={1536}
          height={1024}
          sizes="100vw"
          priority
        />
        <div className={styles.heroText}>
          <h1>{title}</h1>
          <p className={styles.brandName}>{title}</p>
          <p className={styles.intro}>{intro}</p>
        </div>
      </div>
      <div className={styles.chapters}>
        {sections.map((section, index) => (
          <section
            key={section.heading}
            className={`${styles.chapter} ${index % 2 ? styles.reverse : ""} ${index === sections.length - 1 ? styles.closing : ""}`}
          >
            <div className={styles.copy}>
              <h2>{section.heading}</h2>
              {section.body.map((line, lineIndex) => <p key={lineIndex}>{line}</p>)}
            </div>
            {media[index] && <div className={styles.media}>{media[index]}</div>}
          </section>
        ))}
      </div>
      <div className={styles.reading}>{children}</div>
    </article>
  );
}
