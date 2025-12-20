// LanguageContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Language } from "i18n/types";
import { HomeTranslations } from "pages/home/i18n";// 各ページごとの翻訳をimport

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // ←ここに追加
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ja");

  const t = useMemo(() => {
    return (key: string): string => {
      // ドット区切りを解釈してネストを辿る
      const keys = key.split(".");
      let result: any = HomeTranslations[language];
      
      if (!result) {
        console.warn(`No translations found for language: ${language}`);
        return key;
      }
      
      for (const k of keys) {
        if (result === null || result === undefined) {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
        result = result[k];
      }
      
      // 結果が文字列でない場合は key を返す
      if (typeof result !== 'string') {
        console.warn(`Translation value is not a string for key: ${key}`);
        return key;
      }
      
      return result;
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
