"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { HomeMonthSnapshot } from "../types";
import { formatSimulationAmountPair } from "../../simulation/utils/formatters";

type Props = {
  snapshot: HomeMonthSnapshot;
};

export default function CashflowCard({ snapshot }: Props) {
  const { t } = useLanguage();
  const income = formatSimulationAmountPair(snapshot.income);
  const expense = formatSimulationAmountPair(snapshot.totalExpense);
  const surplus = formatSimulationAmountPair(snapshot.surplus);

  return (
    <article className="rounded-3xl border border-border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {t("dashboardHome.sections.monthlyCashflow")}
          </p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">
            {surplus.primary}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{surplus.exact}</p>
        </div>
        <div className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
          {t("dashboardHome.labels.surplus")}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-muted/20 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {t("dashboardHome.labels.income")}
          </p>
          <p className="mt-2 text-xl font-semibold text-foreground">{income.primary}</p>
          <p className="mt-1 text-xs text-muted-foreground">{income.exact}</p>
        </div>
        <div className="rounded-2xl bg-muted/20 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {t("dashboardHome.labels.expense")}
          </p>
          <p className="mt-2 text-xl font-semibold text-foreground">{expense.primary}</p>
          <p className="mt-1 text-xs text-muted-foreground">{expense.exact}</p>
        </div>
      </div>
    </article>
  );
}
