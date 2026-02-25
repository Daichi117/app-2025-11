// i18n/index.ts
import { HomeTranslations } from "@/components/home/i18n";
import { LoginTranslations } from "../features/auth/i18n";
import { NavHeader } from "@/components/navigation/i18n";
import { HouseholdTranslations } from "@/features/dashboard/household/i18n";

export const AppTranslations = {
  ja: {
    home: HomeTranslations.ja,
    login: LoginTranslations.ja,
    nav: NavHeader.ja,
    household: HouseholdTranslations.ja,
  },
  en: {
    home: HomeTranslations.en,
    login: LoginTranslations.en,
    nav: NavHeader.en,
    household: HouseholdTranslations.en,
  },
} as const;
