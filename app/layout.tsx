import type { Metadata } from "next";
import "./globals.css";
import {
  createSeoMetadata,
  homeSeo,
  organizationName,
  siteBaseUrl
} from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  applicationName: organizationName,
  authors: [{ name: organizationName, url: siteBaseUrl }],
  creator: organizationName,
  publisher: organizationName,
  ...createSeoMetadata(homeSeo)
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale === "ja" ? "ja-JP" : "zh-Hant-TW"}>
      <body className="min-h-screen flex flex-col bg-ivory bg-ocean-lines">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <AgeGate />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
