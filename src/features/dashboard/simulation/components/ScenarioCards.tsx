"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { SimulationMode, SimulationScenario } from "../types";
import {
  formatSimulationAmountPair,
  formatSimulationPrimaryAmount,
} from "../utils/formatters";

type Props = {
  mode: SimulationMode;
  scenarios: SimulationScenario[];
  targetAmount: number;
};

export default function ScenarioCards({ mode, scenarios, targetAmount }: Props) {
  const { t } = useLanguage();
  const recommendedScenario =
    mode === "target"
      ? scenarios[1] ?? scenarios[0]
      : scenarios.find((scenario) => scenario.feasible) ?? scenarios[1] ?? scenarios[0];

  return (
    <section className="rounded-[28px] border border-border/70 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold">{t("simulation.scenarios.title")}</h2>
          <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {t("simulation.scenarios.recommended")} {t(recommendedScenario.labelKey)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("simulation.scenarios.description")}
        </p>
        {mode === "target" && (
          <p className="text-sm text-muted-foreground">
            {t("simulation.scenarios.targetModeNote")}
          </p>
        )}
      </div>

      <div className="mt-6 space-y-4">
        {scenarios.map((scenario) => {
          const gap = Math.max(targetAmount - scenario.finalAmount, 0);
          const isRecommended = scenario.id === recommendedScenario.id;
          const statusLabel = isRecommended
            ? t("simulation.scenarios.recommended")
            : mode === "target"
              ? t("simulation.scenarios.requiredPlan")
              : scenario.feasible
                ? t("simulation.results.goalAchievable")
                : t("simulation.results.goalChallenging");
          const statusTone = isRecommended
            ? "bg-primary text-white"
            : mode === "target"
              ? "bg-slate-100 text-slate-700"
              : scenario.feasible
                ? "bg-secondary/15 text-secondary"
                : "bg-destructive/10 text-destructive";

          const monthly = formatSimulationAmountPair(scenario.monthlyContribution);
          const final = formatSimulationAmountPair(scenario.finalAmount);
          const yearly = formatSimulationAmountPair(scenario.yearlyContribution);

          return (
            <article
              key={scenario.id}
              className={`rounded-[24px] border p-5 transition-all ${
                isRecommended
                  ? "border-primary/30 bg-gradient-to-br from-primary/5 via-white to-secondary/5 shadow-lg shadow-primary/10"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold">{t(scenario.labelKey)}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone}`}>
                    {statusLabel}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {t("simulation.scenarios.rate").replace(
                      "{rate}",
                      `${(scenario.annualReturn * 100).toFixed(0)}`
                    )}
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-border/70">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {t(
                        mode === "target"
                          ? "simulation.results.requiredMonthly"
                          : "simulation.results.monthlyContribution"
                      )}
                    </p>
                    <p className="mt-2 text-xl font-bold text-foreground">{monthly.primary}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{monthly.exact}</p>
                  </div>

                  <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-border/70">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {t("simulation.results.finalAssets")}
                    </p>
                    <p className="mt-2 text-xl font-bold text-foreground">{final.primary}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{final.exact}</p>
                  </div>

                  <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-border/70">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {mode === "target"
                        ? t("simulation.scenarios.goalComparison")
                        : scenario.feasible
                          ? t("simulation.scenarios.goalBuffer")
                          : t("simulation.scenarios.goalGap")}
                    </p>
                    <p className="mt-2 text-xl font-bold text-foreground">
                      {formatSimulationPrimaryAmount(
                        mode === "target"
                          ? targetAmount
                          : scenario.feasible
                            ? scenario.finalAmount - targetAmount
                            : gap
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-[1.4fr_0.8fr]">
                  <div className="rounded-2xl bg-muted/20 p-4">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="font-medium text-foreground">
                        {mode === "target"
                          ? t("simulation.scenarios.progressLabelTarget")
                          : t("simulation.scenarios.progressLabel")}
                      </span>
                      <span className="text-muted-foreground">
                        {mode === "target"
                          ? `${(scenario.annualReturn * 100).toFixed(0)}%`
                          : `${Math.round((scenario.finalAmount / Math.max(targetAmount, 1)) * 100)}%`}
                      </span>
                    </div>
                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-border/60">
                      <div
                        className={`h-full rounded-full ${
                          isRecommended
                            ? "bg-primary"
                            : scenario.feasible
                              ? "bg-secondary"
                              : "bg-destructive"
                        }`}
                        style={{
                          width: `${
                            mode === "target"
                              ? Math.max((scenario.annualReturn * 100) * 10, 12)
                              : Math.max(
                                  Math.min(
                                    (scenario.finalAmount / Math.max(targetAmount, 1)) * 100,
                                    100
                                  ),
                                  6
                                )
                          }%`,
                        }}
                      />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {mode === "target"
                        ? t("simulation.scenarios.progressTarget").replace(
                            "{value}",
                            monthly.primary
                          )
                        : scenario.feasible
                          ? t("simulation.scenarios.progressPositive")
                          : t("simulation.scenarios.progressNegative").replace(
                              "{gap}",
                              formatSimulationPrimaryAmount(gap)
                            )}
                    </p>
                  </div>

                  <aside className="rounded-2xl bg-slate-950 p-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                      {t("simulation.scenarios.quickView")}
                    </p>
                    <div className="mt-4 space-y-4">
                      <div>
                        <p className="text-sm text-white/60">
                          {t("simulation.results.yearlyContribution")}
                        </p>
                        <p className="mt-1 text-lg font-semibold">{yearly.primary}</p>
                        <p className="mt-1 text-xs text-white/60">{yearly.exact}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60">
                          {t("simulation.scenarios.horizon")}
                        </p>
                        <p className="mt-1 text-lg font-semibold">
                          {scenario.years}
                          {t("simulation.chart.yearSuffix")}
                        </p>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
