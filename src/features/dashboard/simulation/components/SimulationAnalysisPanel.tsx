"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { SimulationAnalysis } from "../types";
import { formatSimulationAmountPair } from "../utils/formatters";

type Props = {
  analysis: SimulationAnalysis | null;
  isLoading: boolean;
  error: string | null;
};

export default function SimulationAnalysisPanel({ analysis, isLoading, error }: Props) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="text-sm text-muted-foreground">{t("simulation.analysis.loading")}</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive shadow-sm">
        {error}
      </section>
    );
  }

  if (!analysis) {
    return (
      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="text-sm text-muted-foreground">{t("simulation.analysis.empty")}</div>
      </section>
    );
  }

  const currentIncome = formatSimulationAmountPair(analysis.currentMonthIncome);
  const currentExpense = formatSimulationAmountPair(analysis.currentMonthExpense);
  const currentSurplus = formatSimulationAmountPair(analysis.currentMonthSurplus);
  const averageIncome = formatSimulationAmountPair(analysis.averageMonthlyIncome);
  const averageExpense = formatSimulationAmountPair(analysis.averageMonthlyExpense);
  const averageSurplus = formatSimulationAmountPair(analysis.averageMonthlySurplus);
  const requiredSurplus = formatSimulationAmountPair(analysis.requiredMonthlySurplus);
  const surplusGap = formatSimulationAmountPair(analysis.monthlySurplusGap);
  const requiredIncome = formatSimulationAmountPair(analysis.requiredMonthlyIncome);
  const allowableExpense = formatSimulationAmountPair(analysis.allowableMonthlyExpense);
  const targetFixedExpense = formatSimulationAmountPair(analysis.targetFixedExpense);
  const targetVariableExpense = formatSimulationAmountPair(analysis.targetVariableExpense);

  const currentCards = [
    {
      id: "averageIncome",
      label: t("simulation.analysis.averageIncome"),
      primary: averageIncome.primary,
      exact: averageIncome.exact,
      hint: t("simulation.analysis.currentReference").replace("{value}", currentIncome.primary),
    },
    {
      id: "averageExpense",
      label: t("simulation.analysis.averageExpense"),
      primary: averageExpense.primary,
      exact: averageExpense.exact,
      hint: t("simulation.analysis.currentReference").replace("{value}", currentExpense.primary),
    },
    {
      id: "averageSurplus",
      label: t("simulation.analysis.averageSurplus"),
      primary: averageSurplus.primary,
      exact: averageSurplus.exact,
      hint: t("simulation.analysis.currentReference").replace("{value}", currentSurplus.primary),
    },
  ];

  const gapCards = [
    {
      id: "requiredSurplus",
      label: t("simulation.analysis.requiredSurplus"),
      primary: requiredSurplus.primary,
      exact: requiredSurplus.exact,
      hint: t("simulation.analysis.requiredSurplusHint"),
    },
    {
      id: "surplusGap",
      label: t("simulation.analysis.surplusGap"),
      primary: surplusGap.primary,
      exact: surplusGap.exact,
      hint:
        analysis.monthlySurplusGap > 0
          ? t("simulation.analysis.surplusGapHint")
          : t("simulation.analysis.surplusGapOk"),
    },
  ];

  const targetCards = [
    {
      id: "requiredIncome",
      label: t("simulation.analysis.requiredIncome"),
      primary: requiredIncome.primary,
      exact: requiredIncome.exact,
      hint: t("simulation.analysis.requiredIncomeHint"),
    },
    {
      id: "allowableExpense",
      label: t("simulation.analysis.allowableExpense"),
      primary: allowableExpense.primary,
      exact: allowableExpense.exact,
      hint: t("simulation.analysis.allowableExpenseHint"),
    },
    {
      id: "targetFixed",
      label: t("simulation.analysis.targetFixedExpense"),
      primary: targetFixedExpense.primary,
      exact: targetFixedExpense.exact,
      hint: t("simulation.analysis.targetFixedExpenseHint"),
    },
    {
      id: "targetVariable",
      label: t("simulation.analysis.targetVariableExpense"),
      primary: targetVariableExpense.primary,
      exact: targetVariableExpense.exact,
      hint: t("simulation.analysis.targetVariableExpenseHint"),
    },
  ];

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-bold">{t("simulation.analysis.title")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("simulation.analysis.description")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
            {analysis.source === "ai"
              ? t("simulation.analysis.sourceAi")
              : t("simulation.analysis.sourceRules")}
          </span>
          <Link
            href="/dashboard/todo"
            className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            {t("simulation.analysis.openTodo")}
          </Link>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-primary/10 bg-primary/5 p-5">
        <p className="text-sm font-semibold text-foreground">{t("simulation.analysis.narrativeTitle")}</p>
        <p className="mt-2 text-base leading-7 text-foreground">{analysis.narrative}</p>
        <p className="mt-3 text-sm text-muted-foreground">{analysis.nextAction}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-foreground">
          {t("simulation.analysis.currentSection")}
        </h3>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {currentCards.map((card) => (
            <article key={card.id} className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{card.primary}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.exact}</p>
              <p className="mt-3 text-xs text-muted-foreground">{card.hint}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-foreground">
          {t("simulation.analysis.gapSection")}
        </h3>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {gapCards.map((card) => (
            <article key={card.id} className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{card.primary}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.exact}</p>
              <p className="mt-3 text-xs text-muted-foreground">{card.hint}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-foreground">
          {t("simulation.analysis.targetSection")}
        </h3>
        <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {targetCards.map((card) => (
            <article key={card.id} className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{card.primary}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.exact}</p>
              <p className="mt-3 text-xs text-muted-foreground">{card.hint}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-foreground">
          {t("simulation.analysis.focusSection")}
        </h3>
        <div className="mt-3 space-y-3">
          {analysis.focusAreas.length > 0 ? (
            analysis.focusAreas.map((area) => {
              const current = formatSimulationAmountPair(area.currentAmount);
              const average = formatSimulationAmountPair(area.averageAmount);

              return (
                <article
                  key={`${area.kind}-${area.category}`}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                      {t(`simulation.analysis.kind.${area.kind}`)}
                    </span>
                    <p className="text-sm font-semibold text-foreground">{area.category}</p>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{area.note}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {t("simulation.analysis.focusNumbers")
                      .replace("{current}", current.primary)
                      .replace("{average}", average.primary)}
                  </p>
                </article>
              );
            })
          ) : (
            <div className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">
              {t("simulation.analysis.noFocusAreas")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
