// i18n/index.ts
import { HomeTranslations } from "pages/home/i18n";
import { LoginTranslations } from "components/auth/login/i18n";

export const AppTranslations = {
  ja: {
    home: HomeTranslations.ja,
    login: LoginTranslations.ja,
  },
  en: {
    home: HomeTranslations.en,
    login: LoginTranslations.en,
  },
} as const;
