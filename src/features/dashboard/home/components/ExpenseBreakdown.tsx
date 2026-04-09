"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";
import { formatSimulationAmountPair } from "../../simulation/utils/formatters";

type Props = {
  income: number;
  fixed: number;
  variable: number;
  assets: number;
  total: number;
};

const COLORS = ["#2563eb", "#0f766e", "#d97706"];

export default function ExpenseBreakdown({ income, fixed, variable, assets, total }: Props) {
  const { t } = useLanguage();
  const chartData = [
    {
      id: "fixed",
      label: t("dashboardHome.labels.fixedExpense"),
      amount: fixed,
      share: income > 0 ? Math.round((fixed / income) * 100) : 0,
    },
    {
      id: "variable",
      label: t("dashboardHome.labels.variableExpense"),
      amount: variable,
      share: income > 0 ? Math.round((variable / income) * 100) : 0,
    },
    {
      id: "assets",
      label: t("dashboardHome.labels.currentAssets"),
      amount: Math.max(assets, 0),
      share: income > 0 ? Math.round((Math.max(assets, 0) / income) * 100) : 0,
    },
  ];
  const incomeFormatted = formatSimulationAmountPair(income);
  const totalFormatted = formatSimulationAmountPair(total);

  return (
    <section className="rounded-3xl border border-border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">{t("dashboardHome.sections.expenseBreakdown")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("dashboardHome.descriptions.expenseBreakdown")}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {t("dashboardHome.labels.income")}
          </p>
          <p className="mt-2 text-lg font-semibold text-foreground">{incomeFormatted.primary}</p>
          <p className="mt-1 text-xs text-muted-foreground">{incomeFormatted.exact}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="amount"
                innerRadius={68}
                outerRadius={92}
                paddingAngle={2}
                stroke="none"
              >
                {chartData.map((item, index) => (
                  <Cell key={item.id} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            {t("dashboardHome.labels.incomeAllocation")}
          </p>
          {chartData.map((item, index) => {
            const amount = formatSimulationAmountPair(item.amount);

            return (
              <article key={item.id} className="rounded-2xl bg-muted/20 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground">{item.share}%</p>
                </div>
                <p className="mt-3 text-xl font-semibold text-foreground">{amount.primary}</p>
                <p className="mt-1 text-xs text-muted-foreground">{amount.exact}</p>
              </article>
            );
          })}
          <article className="rounded-2xl border border-dashed border-border p-4">
            <p className="text-sm text-muted-foreground">{t("dashboardHome.labels.expense")}</p>
            <p className="mt-2 text-lg font-semibold text-foreground">{totalFormatted.primary}</p>
            <p className="mt-1 text-xs text-muted-foreground">{totalFormatted.exact}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
