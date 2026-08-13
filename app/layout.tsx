import type { Metadata } from "next";
import "./globals.css";
import { siteBaseUrl } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { AGE_VERIFICATION_COOKIE } from "@/lib/ageVerification";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("site");
  return {
    title: t("companyName"),
    description: t("description"),
    metadataBase: new URL(siteBaseUrl)
  };
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const ageVerified =
    cookies().get(AGE_VERIFICATION_COOKIE)?.value === "1";

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col bg-ivory bg-ocean-lines">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <AgeGate initiallyVerified={ageVerified} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
