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
    <Image key="brewery" className={`${styles.photo} ${styles.exterior}`} src="/images/brand/tsukinoi/tsukinoi-brewery-exterior.jpg" alt="月之井酒造店酒藏外觀" width={5160} height={3440} sizes="(min-width: 1280px) 468px, (min-width: 768px) 640px, 100vw" />,
    <Image key="coast" className={`${styles.photo} ${styles.coast}`} src="/images/brand/tsukinoi/tsukinoi-oarai-coast.jpg" alt="月之井酒瓶與礫石海岸" width={700} height={700} sizes="(min-width: 1280px) 468px, (min-width: 768px) 560px, 100vw" />,
    <Image key="koji" className={styles.photo} src="/images/brand/tsukinoi/tsukinoi-koji-tray.jpg" alt="雙手在木製麹蓋中整理米麹" width={920} height={613} sizes="(min-width: 1280px) 468px, (min-width: 768px) 640px, 100vw" />,
    <Image key="daily-life" className={`${styles.photo} ${styles.lifestyle}`} src="/images/brand/tsukinoi/tsukinoi-sake-table.jpg" alt="月之井日本酒搭配酒器與料理的餐桌情境" width={750} height={1064} sizes="(min-width: 1280px) 468px, (min-width: 768px) 480px, 100vw" />
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
