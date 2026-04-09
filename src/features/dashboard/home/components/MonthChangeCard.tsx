"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { formatSimulationAmountPair, formatSimulationPrimaryAmount } from "../../simulation/utils/formatters";

type Props = {
  currentSurplus: number;
  previousSurplus: number;
};

export default function MonthChangeCard({ currentSurplus, previousSurplus }: Props) {
  const { t } = useLanguage();
  const delta = currentSurplus - previousSurplus;
  const current = formatSimulationAmountPair(currentSurplus);

  const toneClass =
    delta > 0
      ? "text-secondary bg-secondary/10"
      : delta < 0
        ? "text-destructive bg-destructive/10"
        : "text-muted-foreground bg-muted/20";

  const statusLabel =
    delta > 0
      ? t("dashboardHome.labels.monthUp")
      : delta < 0
        ? t("dashboardHome.labels.monthDown")
        : t("dashboardHome.labels.monthFlat");

  return (
    <article className="rounded-3xl border border-border bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-muted-foreground">
        {t("dashboardHome.labels.monthOverMonth")}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toneClass}`}>
          {statusLabel}
        </span>
        <p className="text-sm text-muted-foreground">
          {t("dashboardHome.labels.currentMonthSurplus")}
        </p>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">{current.primary}</p>
      <p className="mt-2 text-sm text-muted-foreground">{current.exact}</p>
      <p className="mt-6 text-sm text-muted-foreground">
        {t("dashboardHome.labels.changeAmount").replace(
          "{value}",
          delta === 0 ? "±0" : formatSimulationPrimaryAmount(delta)
        )}
      </p>
    </article>
  );
}
