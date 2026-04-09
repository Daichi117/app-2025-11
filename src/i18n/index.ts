// i18n/index.ts
import { HomeTranslations } from "@/components/home/i18n";
import { LoginTranslations } from "../features/auth/i18n";
import { NavHeader } from "@/components/navigation/i18n";
import { HouseholdTranslations } from "@/features/dashboard/household/i18n";
import { ContextTranslations } from "@/components/i18n";
import { SimulationTranslations } from "@/features/dashboard/simulation/i18n";
import { DashboardHomeTranslations } from "@/features/dashboard/home/i18n";
import { DashboardTodoTranslations } from "@/features/dashboard/todo/i18n";

export const AppTranslations = {
  ja: {
    home: HomeTranslations.ja,
    login: LoginTranslations.ja,
    nav: NavHeader.ja,
    household: HouseholdTranslations.ja,
    context:ContextTranslations.ja,
    simulation: SimulationTranslations.ja,
    dashboardHome: DashboardHomeTranslations.ja,
    dashboardTodo: DashboardTodoTranslations.ja,
  },
  en: {
    home: HomeTranslations.en,
    login: LoginTranslations.en,
    nav: NavHeader.en,
    household: HouseholdTranslations.en,
    context:ContextTranslations.en,
    simulation: SimulationTranslations.en,
    dashboardHome: DashboardHomeTranslations.en,
    dashboardTodo: DashboardTodoTranslations.en,
  },
} as const;
