// Set published to true to restore the brand page, listing and sitemap entry.
const brands = [
  {
    slug: "tsukinoi",
    published: true,
    titleKey: "brandIntro.cardTitle",
    image: "/images/tsukinoi_logo.jpeg",
    imageClassName: "object-contain p-6",
    subtitleKey: null
  },
  {
    slug: "shine-muscat",
    published: false,
    titleKey: "brandIntro.shineMuscat.cardTitle",
    image: "/images/shine-muscat-05.jpg",
    imageClassName:
      "object-cover object-center group-hover:scale-[1.02] transition-transform",
    subtitleKey: "brandIntro.shineMuscat.subtitle"
  }
] as const;

export function getPublishedBrands() {
  return brands.filter((brand) => brand.published);
}

export function getPublishedBrand(slug: string) {
  return getPublishedBrands().find((brand) => brand.slug === slug);
}
