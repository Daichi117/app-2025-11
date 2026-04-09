"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { SimulationResult as SimulationResultType } from "../types";
import {
  formatSimulationAmountPair,
  formatSimulationPrimaryAmount,
} from "../utils/formatters";

type Props = {
  result: SimulationResultType;
};

export default function SimulationResult({ result }: Props) {
  const { t } = useLanguage();
  const goalGap = Math.max(result.targetAmount - result.finalAmount, 0);
  const isGoalMet = result.finalAmount >= result.targetAmount;
  const targetAmount = formatSimulationAmountPair(result.targetAmount);
  const currentAssets = formatSimulationAmountPair(result.currentAssets);
  const finalAmount = formatSimulationAmountPair(result.finalAmount);

  const overviewCards = [
    {
      id: "target",
      label: t("simulation.results.targetAmount"),
      value: targetAmount.primary,
      exact: targetAmount.exact,
    },
    {
      id: "currentAssets",
      label: t("simulation.results.currentAssets"),
      value: currentAssets.primary,
      exact: currentAssets.exact,
    },
    {
      id: "years",
      label: t("simulation.results.requiredYears"),
      value: `${result.years}${t("simulation.chart.yearSuffix")}`,
      exact: `${(result.annualReturn * 100).toFixed(1)}%`,
    },
    {
      id: "finalAssets",
      label:
        result.mode === "target"
          ? t("simulation.results.estimatedFinalAssets")
          : t("simulation.results.finalAssets"),
      value: finalAmount.primary,
      exact: finalAmount.exact,
    },
  ];

  const planCards = [
    {
      id: "monthly",
      label:
        result.mode === "target"
          ? t("simulation.results.requiredMonthly")
          : t("simulation.results.monthlyContribution"),
      ...formatSimulationAmountPair(result.monthlyContribution),
      tone: "text-primary",
    },
    {
      id: "yearly",
      label: t("simulation.results.yearlyContribution"),
      ...formatSimulationAmountPair(result.yearlyContribution),
      tone: "text-secondary",
    },
    {
      id: "principal",
      label: t("simulation.results.totalInvestment"),
      ...formatSimulationAmountPair(result.principal),
      tone: "text-foreground",
      hint: t("simulation.results.totalInvestmentHint"),
    },
    {
      id: "gains",
      label: t("simulation.results.gains"),
      ...formatSimulationAmountPair(result.gains),
      tone: result.gains > 0 ? "text-secondary" : "text-foreground",
    },
  ];

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div
        className={`rounded-2xl p-5 ${
          isGoalMet
            ? "border border-secondary/20 bg-secondary/10"
            : "border border-destructive/20 bg-destructive/5"
        }`}
      >
        <p className="text-sm font-medium text-muted-foreground">
          {t("simulation.results.takeawayLabel")}
        </p>
        <p className="mt-2 text-2xl font-bold text-foreground">
          {result.mode === "target"
            ? t("simulation.results.takeawayTarget").replace(
                "{value}",
                formatSimulationPrimaryAmount(result.monthlyContribution)
              )
            : t("simulation.results.takeawayProjection").replace(
                "{value}",
                finalAmount.primary
              )}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {isGoalMet
            ? t("simulation.results.summaryPositive")
            : t("simulation.results.summaryNegative").replace(
                "{gap}",
                formatSimulationPrimaryAmount(goalGap)
              )}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-bold">{t("simulation.results.title")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("simulation.results.description")
              .replace("{years}", `${result.years}`)
              .replace("{rate}", `${(result.annualReturn * 100).toFixed(1)}`)}
          </p>
        </div>
        <div
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            isGoalMet
              ? "bg-secondary/15 text-secondary"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {isGoalMet
            ? t("simulation.results.goalAchievable")
            : t("simulation.results.goalChallenging")}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <article key={card.id} className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{card.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{card.exact}</p>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-foreground">
          {t("simulation.results.planSectionTitle")}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("simulation.results.planSectionDescription")}
        </p>
      </div>

      <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {planCards.map((card) => (
          <article key={card.id} className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className={`mt-2 text-2xl font-bold ${card.tone}`}>{card.primary}</p>
            <p className="mt-1 text-xs text-muted-foreground">{card.exact}</p>
            {"hint" in card && card.hint ? (
              <p className="mt-3 text-xs text-muted-foreground">{card.hint}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
