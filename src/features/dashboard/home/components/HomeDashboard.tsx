"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import ExpenseBreakdown from "./ExpenseBreakdown";
import GoalDigest from "./GoalDigest";
import HomeTopSummary from "./HomeTopSummary";
import RecentActivity from "./RecentActivity";
import { useHomeDashboard } from "../hooks/useHomeDashboard";

export default function HomeDashboard() {
  const { t } = useLanguage();
  const { data, isLoading, error } = useHomeDashboard();

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="rounded-3xl border border-border bg-white p-8 text-muted-foreground shadow-sm">
          {t("dashboardHome.states.loading")}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-8 text-destructive shadow-sm">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <section className="rounded-[32px] border border-border bg-white p-8 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {t("dashboardHome.hero.eyebrow")}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("dashboardHome.hero.title")}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          {t("dashboardHome.hero.description")}
        </p>
      </section>

      <HomeTopSummary
        currentAssets={data.currentAssets}
        currentMonth={data.currentMonth}
        previousMonth={data.previousMonth}
      />

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <ExpenseBreakdown
          income={data.expenseBreakdown.income}
          fixed={data.expenseBreakdown.fixed}
          variable={data.expenseBreakdown.variable}
          assets={data.expenseBreakdown.assets}
          total={data.expenseBreakdown.total}
        />
        <RecentActivity items={data.recentItems} />
      </section>

      <GoalDigest digest={data.goalDigest} />
    </main>
  );
}
