import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "./i18n/config";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const requested = url.searchParams.get("lang") as Locale | null;

  if (requested && locales.includes(requested)) {
    const response = NextResponse.next();
    response.cookies.set("lang", requested, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365
    });
    return response;
  }

  if (!request.cookies.get("lang")) {
    const response = NextResponse.next();
    response.cookies.set("lang", defaultLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"]
};
