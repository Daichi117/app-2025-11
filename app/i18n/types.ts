export type Language = 'ja' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}
