"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { Language } from "i18n/types";

/* ------------------------
   型定義（再帰型→平坦化で安全に扱う）
   ------------------------ */
/** 翻訳の木構造（ネスト可能） */
type TranslationValue = string | { [key: string]: TranslationValue };

/** 全言語分の翻訳データ */
type Translations = Record<Language, TranslationValue | undefined>;

/** Context の型 */
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

/* ------------------------
   Context（Provider外での誤使用は null にする）
   ------------------------ */
const LanguageContext = createContext<LanguageContextType | null>(null);


function flattenTranslations(
  node: TranslationValue | undefined,
  prefix = ""
): Record<string, string> {
  const out: Record<string, string> = {};
  if (typeof node === "string") {
    out[prefix] = node;
    return out;
  }
  if (!node || typeof node !== "object") return out;

  for (const key of Object.keys(node)) {
    const val = node[key];
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === "string") {
      out[nextKey] = val;
    } else {
      Object.assign(out, flattenTranslations(val, nextKey));
    }
  }
  return out;
}

/* ------------------------
   Provider
   ------------------------ */
export function LanguageProvider({
  children,
  translations,
  defaultLanguage = "ja",
  fallbackLanguage = "en",
}: {
  children: ReactNode;
  translations: Translations;
  defaultLanguage?: Language;
  fallbackLanguage?: Language;
}) {
  // 現在の言語 state
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  // 平坦化した map をキャッシュ（translations の参照が変わった時だけ再計算）
  const flatByLang = useMemo(() => {
    const map: Record<Language, Record<string, string>> = {} as any;
    (Object.keys(translations) as Language[]).forEach((lang) => {
      map[lang] = flattenTranslations(translations[lang]);
    });
    return map;
  }, [translations]);

  // 翻訳関数 t を安定化（参照が変わらないように useCallback）
  const t = useCallback(
    (key: string): string => {
      const currentFlat = flatByLang[language] ?? {};
      const fbFlat = flatByLang[fallbackLanguage] ?? {};
      // まず現在言語の flat map を見て、なければフォールバックを見る
      return currentFlat[key] ?? fbFlat[key] ?? key;
    },
    [language, flatByLang, fallbackLanguage]
  );

  // Context value を memoize（value オブジェクトの参照安定化で consumer の不要再レンダーを防ぐ）
  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/* ------------------------
   カスタムフック（安全に取得）
   ------------------------ */
export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
