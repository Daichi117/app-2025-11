/**
 * Server-side translation (Route Handlers, Server Actions).
 * Do NOT use useLanguage() / React hooks here — they only work in client components.
 */
import type { NextRequest } from "next/server";
import { AppTranslations } from "@/i18n";
import type { Language } from "@/i18n/types";
import { flattenTranslations } from "@/i18n/flattenTranslations";

const fallbackLanguage: Language = "en";

const flatByLang = (() => {
  const map: Record<Language, Record<string, string>> = {} as Record<
    Language,
    Record<string, string>
  >;
  (Object.keys(AppTranslations) as Language[]).forEach((lang) => {
    map[lang] = flattenTranslations(
      AppTranslations[lang] as Parameters<typeof flattenTranslations>[0]
    );
  });
  return map;
})();

export type ServerTranslate = (key: string) => string;

/** Same lookup rules as LanguageContext `t` */
export function createServerTranslator(
  language: Language,
  fb: Language = fallbackLanguage
): ServerTranslate {
  return (key: string) => {
    const current = flatByLang[language] ?? {};
    const fbFlat = flatByLang[fb] ?? {};
    return current[key] ?? fbFlat[key] ?? key;
  };
}

/** Resolve language for API: Cookie `locale` (set by LanguageProvider) → Accept-Language → default `ja` */
export function resolveLocaleFromRequest(req: NextRequest): Language {
  const cookie = req.cookies.get("locale")?.value;
  if (cookie === "ja" || cookie === "en") return cookie;

  const accept = req.headers.get("accept-language") ?? "";
  if (/^en\b/i.test(accept) || accept.toLowerCase().includes("en-")) {
    return "en";
  }

  return "ja";
}

/** Convenience: `const t = createServerTranslator(resolveLocaleFromRequest(req))` */
export function getServerTranslator(req: NextRequest): ServerTranslate {
  return createServerTranslator(resolveLocaleFromRequest(req));
}
