import type { Metadata } from "next";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "合作方式｜信億尉貿易有限公司",
  description: "信億尉貿易有限公司合作方式。",
  path: "/services",
  noIndex: true
});

export default function ServicesPage() {
  return null;
}
