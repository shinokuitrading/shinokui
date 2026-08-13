import productsData from "@/data/products.json";

export type ManufacturerProductDetails = {
  intro: string[];
  intro_ja?: string[];
  story_title?: string;
  story_title_ja?: string;
  story?: string[];
  story_ja?: string[];
  specifications: Array<{
    label: string;
    label_ja?: string;
    value: string;
    value_ja?: string;
  }>;
  staff_voice: string[];
  staff_voice_ja?: string[];
  staff_voice_subtitle?: string;
  staff_voice_subtitle_ja?: string;
};

export type Product = {
  slug: string;
  name_zh: string;
  name_jp: string;
  abv: number;
  volume_ml: number;
  category: string;
  price_note?: string;
  description: string | string[];
  description_ja?: string | string[];
  pairing: string | string[];
  pairing_ja?: string | string[];
  serving?: string | string[];
  serving_ja?: string | string[];
  image: string;
  card_image_position_y?: number;
  manufacturer_details?: ManufacturerProductDetails;
};

export function getAllProducts(): Product[] {
  return productsData as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  const set = new Set(getAllProducts().map((p) => p.category));
  return Array.from(set);
}
