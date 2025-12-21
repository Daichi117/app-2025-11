"use client";
import { createContext,useContext,useState,ReactNode,useMemo } from "react";
import { Language} from "i18n/types";

type Translations = Record<Language,any>;
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t:(key:string)=> string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({children,translations}:{children:ReactNode,translations:Translations}) {
  const [language,setLanguage] = useState<Language>('ja');
  const t = useMemo(() => {
    return (key: string): string => {
      const keys = key.split(".");
      let result = translations[language];

      if (!result) {
        console.warn(`No translations for language: ${language}`);
        return key;
      }

      for (const k of keys) {
        if (result == null) {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
        result = result[k];
      }

      return typeof result === "string" ? result : key;
    };
  }, [language, translations]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

