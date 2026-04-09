"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { YearPoint } from "../types";
import { formatSimulationAmountPair } from "../utils/formatters";

type Props = {
  data: YearPoint[];
};

export default function SimulationYearTable({ data }: Props) {
  const { t } = useLanguage();
  const lastYear = data.at(-1)?.year ?? 0;
  const rows = data.filter((point) => point.year === 0 || point.year % 5 === 0 || point.year === lastYear);

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold">{t("simulation.table.title")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("simulation.table.description")}
        </p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-4 py-3 font-medium">{t("simulation.table.year")}</th>
              <th className="px-4 py-3 font-medium">{t("simulation.chart.assets")}</th>
              <th className="px-4 py-3 font-medium">{t("simulation.chart.principal")}</th>
              <th className="px-4 py-3 font-medium">{t("simulation.chart.gains")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const assets = formatSimulationAmountPair(row.assets);
              const principal = formatSimulationAmountPair(row.principal);
              const gains = formatSimulationAmountPair(row.gains);

              return (
                <tr key={row.year} className="border-b border-border/60 align-top">
                  <td className="px-4 py-4 font-semibold text-foreground">
                    {row.year}
                    {t("simulation.chart.yearSuffix")}
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-foreground">{assets.primary}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{assets.exact}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-foreground">{principal.primary}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{principal.exact}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-foreground">{gains.primary}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{gains.exact}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
