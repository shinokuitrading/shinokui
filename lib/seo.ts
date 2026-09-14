import type { Metadata } from "next";

export const siteBaseUrl = "https://shin-okui-trading.com";
export const siteName = "信億尉貿易有限公司";
export const organizationName = "信億尉貿易有限公司";
export const organizationAlternateName = "Shin-Okui Trading";
export const brandName = "月の井酒造店";
export const defaultOgImage = "/images/Logo.jpg";

export const homeSeo = {
  title: "月之井清酒台灣總代理｜信億尉貿易有限公司",
  description:
    "信億尉貿易有限公司為日本茨城縣大洗町月の井酒造店台灣總代理，正式引進和之月39、彥市純米大吟釀、彥市純米吟釀、AQUA發泡清酒與戀梅梅酒，將創業於1865年的日本酒文化帶進台灣。",
  path: "/",
  image: defaultOgImage,
  imageAlt: "信億尉貿易有限公司標誌"
} as const;

export const productsSeo = {
  title: "月之井清酒產品｜和之月39・彥市・AQUA・戀梅｜信億尉貿易",
  description:
    "探索月之井酒造店台灣正式引進酒款，包括和之月39生酛生原酒、彥市純米大吟釀、彥市純米吟釀、AQUA發泡清酒與戀梅梅酒，查看各酒款特色、風味與建議飲用方式。",
  path: "/products",
  image: "/images/和の月39.jpg",
  imageAlt: "月之井清酒產品"
} as const;

export const aboutSeo = {
  title: "關於信億尉貿易｜月之井酒造店台灣總代理",
  description:
    "信億尉貿易有限公司致力於引進日本優質酒類，為茨城縣大洗町月の井酒造店台灣總代理，將月之井百年酒藏的釀造文化與日本酒帶進台灣市場。",
  path: "/about",
  image: "/images/aboutme.jpg",
  imageAlt: "信億尉貿易有限公司品牌與釀造文化"
} as const;

export const newsSeo = {
  title: "最新消息｜月之井清酒・日本酒資訊｜信億尉貿易",
  description:
    "信億尉貿易最新消息，包含月之井清酒台灣資訊、新酒上市、酒款介紹、品飲活動與日本酒相關內容。",
  path: "/news",
  image: defaultOgImage,
  imageAlt: "信億尉貿易最新消息"
} as const;

export const productSeoBySlug = {
  "wano-tsuki-39": {
    title: "和之月39 生酛生原酒｜月之井清酒台灣總代理",
    description:
      "月之井酒造店「和之月39」生酛生原酒，展現細膩香氣、深厚旨味與豐富層次。生原酒特有的飽滿酒體，適合溫酒、冷飲、加氣泡水或加冰塊品飲。",
    h1: "和之月39 生酛生原酒 しずく",
    alternateNames: ["和の月39", "NANOTSUKI 39"],
    imageAlt: "月之井 和之月39 生酛生原酒"
  },
  "hikoichi-junmai-daiginjo": {
    title: "彥市 純米大吟釀｜月之井酒造店台灣總代理",
    description:
      "月之井酒造店「彥市 純米大吟釀」，延續大洗在地釀造精神，以細緻酒體呈現優雅而平衡的風味，風味定位為微辛口。查看酒款資料、飲用方式與料理搭配。",
    h1: "彥市 純米大吟釀",
    alternateNames: ["彦市 純米大吟醸", "Hikoichi Junmai Daiginjo"],
    imageAlt: "月之井 彥市 純米大吟釀"
  },
  "hikoichi-junmai-ginjo": {
    title: "彥市 純米吟釀｜月之井酒造店台灣總代理",
    description:
      "月之井酒造店「彥市 純米吟釀」，承襲大洗在地釀造理念，呈現俐落而平衡的辛口風格。查看酒款特色、釀造資料、建議飲用方式與料理搭配。",
    h1: "彥市 純米吟釀",
    alternateNames: ["彦市 純米吟醸", "Hikoichi Junmai Ginjo"],
    imageAlt: "月之井 彥市 純米吟釀"
  },
  "aqua-300": {
    title: "AQUA 發泡清酒｜月之井酒造店台灣總代理",
    description:
      "月之井酒造店 AQUA 發泡清酒，以輕盈氣泡呈現清爽日本酒體驗。300ml、酒精濃度9%，適合冰涼品飲，認識 AQUA 的酒款特色與推薦飲用方式。",
    h1: "AQUA 發泡清酒",
    alternateNames: ["発泡清酒 AQUA", "AQUA Sparkling Sake"],
    imageAlt: "月之井 AQUA 發泡清酒"
  },
  "umeshu-sake-base": {
    title: "戀梅 梅酒｜月之井酒造店台灣總代理",
    description:
      "月之井酒造店「戀梅」梅酒，以梅子的香氣與酸甜平衡呈現圓潤風味。查看戀梅梅酒特色、建議飲用方式與適合搭配的飲食情境。",
    h1: "戀梅 梅酒",
    alternateNames: ["恋梅", "Koiume"],
    imageAlt: "月之井 戀梅 梅酒"
  }
} as const;

export type ProductSeoSlug = keyof typeof productSeoBySlug;

type SeoMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteBaseUrl}/`).toString();
}

export function createSeoMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
  imageAlt = title,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false
}: SeoMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      siteName,
      locale: "zh_TW",
      images: [{ url: imageUrl, alt: imageAlt }],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {})
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}

export function getProductSeo(slug: string) {
  return productSeoBySlug[slug as ProductSeoSlug];
}
