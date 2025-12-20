import { Language } from "./types";

export function getTranslations<T extends Record<string,Record<string,string>>>
    (translations:Record<Language,T>,lang:Language):T {
        return translations[lang];
    }
