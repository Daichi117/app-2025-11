"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { HomeGoalDigest } from "../types";
import { formatSimulationAmountPair, formatSimulationPrimaryAmount } from "../../simulation/utils/formatters";

type Props = {
  digest: HomeGoalDigest | null;
};

export default function GoalDigest({ digest }: Props) {
  const { t } = useLanguage();

  if (!digest) {
    return (
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{t("dashboardHome.sections.goalDigest")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("dashboardHome.descriptions.goalDigest")}
            </p>
          </div>
          <Link
            href="/dashboard/simulation"
            className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            {t("dashboardHome.links.viewSimulation")}
          </Link>
        </div>
        <div className="mt-6 rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          {t("dashboardHome.states.noPlan")}
        </div>
      </section>
    );
  }

  const target = formatSimulationAmountPair(digest.plan.targetAmount);
  const required = formatSimulationAmountPair(digest.requiredMonthlyInvestment);
  const projected = formatSimulationAmountPair(digest.projectedFinalAssets);

  return (
    <section className="rounded-3xl border border-border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">{t("dashboardHome.sections.goalDigest")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("dashboardHome.descriptions.goalDigest")}
          </p>
        </div>
        <Link
          href="/dashboard/simulation"
          className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          {t("dashboardHome.links.viewSimulation")}
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl bg-muted/20 p-4">
          <p className="text-sm text-muted-foreground">{t("dashboardHome.labels.targetAmount")}</p>
          <p className="mt-2 text-xl font-semibold text-foreground">{target.primary}</p>
          <p className="mt-1 text-xs text-muted-foreground">{target.exact}</p>
        </article>
        <article className="rounded-2xl bg-muted/20 p-4">
          <p className="text-sm text-muted-foreground">{t("dashboardHome.labels.targetDate")}</p>
          <p className="mt-2 text-xl font-semibold text-foreground">{digest.targetDateLabel}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {(digest.plan.annualReturn * 100).toFixed(1)}%
          </p>
        </article>
        <article className="rounded-2xl bg-muted/20 p-4">
          <p className="text-sm text-muted-foreground">{t("dashboardHome.labels.requiredMonthly")}</p>
          <p className="mt-2 text-xl font-semibold text-primary">{required.primary}</p>
          <p className="mt-1 text-xs text-muted-foreground">{required.exact}</p>
        </article>
        <article className="rounded-2xl bg-muted/20 p-4">
          <p className="text-sm text-muted-foreground">{t("dashboardHome.labels.projectedAssets")}</p>
          <p className="mt-2 text-xl font-semibold text-foreground">{projected.primary}</p>
          <p className="mt-1 text-xs text-muted-foreground">{projected.exact}</p>
        </article>
      </div>

      <div className="mt-4 rounded-2xl bg-card p-4 ring-1 ring-border/70">
        <p className="text-sm text-muted-foreground">{t("dashboardHome.labels.goalStatus")}</p>
        <p className="mt-2 text-lg font-semibold text-foreground">
          {digest.isOnTrack
            ? t("dashboardHome.states.onTrack")
            : t("dashboardHome.states.offTrack").replace(
                "{gap}",
                formatSimulationPrimaryAmount(Math.max(digest.monthlyGap, 0))
              )}
        </p>
      </div>
    </section>
  );
}
