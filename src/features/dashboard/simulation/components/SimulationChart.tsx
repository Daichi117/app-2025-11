"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { YearPoint } from "../types";
import {
  formatSimulationExactAmount,
  formatSimulationPrimaryAmount,
} from "../utils/formatters";

type Props = {
  data: YearPoint[];
};

export default function SimulationChart({ data }: Props) {
  const { t } = useLanguage();

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold">{t("simulation.chart.title")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("simulation.chart.description")}
        </p>
      </div>

      <div className="mt-6 h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
            <XAxis
              dataKey="year"
              tickFormatter={(value) => `${value}${t("simulation.chart.yearSuffix")}`}
            />
            <YAxis tickFormatter={(value) => formatSimulationPrimaryAmount(Number(value))} />
            <Tooltip
              formatter={(value: number) => formatSimulationExactAmount(Math.round(value))}
              labelFormatter={(label) => `${label}${t("simulation.chart.yearSuffix")}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="assets"
              name={t("simulation.chart.assets")}
              stroke="#0f766e"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="principal"
              name={t("simulation.chart.principal")}
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="gains"
              name={t("simulation.chart.gains")}
              stroke="#dc2626"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
