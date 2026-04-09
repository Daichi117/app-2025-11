"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { Language } from "../i18n/types";
import {
  flattenTranslations,
  type TranslationValue,
} from "../i18n/flattenTranslations";

/* -----------------------------------------------------------
   1. 型定義：データの「形」を決める
   ----------------------------------------------------------- */

// 全言語（ja, enなど）をまとめたデータの型です
type Translations = Record<Language, TranslationValue | undefined>;

// コンポーネントがこの機能（Context）から受け取れるデータのセットです
interface LanguageContextType {
  language: Language;           // 現在の言語（例: "ja"）
  setLanguage: (lang: Language) => void; // 言語を切り替える関数
  t: (key: string) => string;   // 翻訳を実行する関数
}

/* -----------------------------------------------------------
   2. Contextの作成：データの「置き場所」を作る
   ----------------------------------------------------------- */
// アプリのどこからでもアクセスできる「共通の箱」を作ります
const LanguageContext = createContext<LanguageContextType | null>(null);

/* -----------------------------------------------------------
   3. Provider：機能を「提供」する親コンポーネント
   ----------------------------------------------------------- */
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
  // 【State】現在の言語を管理。setLanguageを呼ぶと、これを使う全画面が再描画されます。
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  // API Route 用: サーバーが言語を解決できるよう Cookie に同期
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.cookie = `locale=${language};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
  }, [language]);

  // 【useMemo】重い処理（平坦化）の結果を保存します。
  // translations（元の辞書）が変わらない限り、再計算しません。
  const flatByLang = useMemo(() => {
    const map = {} as Record<Language, Record<string, string>>;
    (Object.keys(translations) as Language[]).forEach((lang) => {
      map[lang] = flattenTranslations(translations[lang]);
    });
    return map;
  }, [translations]);

  // 【useCallback】実際の翻訳機能です。
  // コンポーネントが再描画されるたびにこの関数が「作り直される」のを防ぎます。
  const t = useCallback(
    (key: string): string => {
      const currentFlat = flatByLang[language] ?? {}; // 現在の言語の辞書
      const fbFlat = flatByLang[fallbackLanguage] ?? {}; // 予備の言語（英語など）の辞書
      
      // 今の言語になければ予備を、予備もなければキー名をそのまま返します
      return currentFlat[key] ?? fbFlat[key] ?? key;
    },
    [language, flatByLang, fallbackLanguage] // これらが変わった時だけ関数を更新
  );

  // 【useMemo】Contextに渡すオブジェクトを固定します。
  // これをしないと、中身が変わっていなくても子コンポーネントが無駄に再描画されます。
  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/* -----------------------------------------------------------
   4. カスタムフック：使う側の「窓口」
   ----------------------------------------------------------- */
export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  // Providerの外（設定漏れ）で使おうとしたらエラーを出して開発者に知らせます
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
