"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { formatSimulationAmountPair } from "../../simulation/utils/formatters";

type Props = {
  amount: number;
};

export default function AssetCard({ amount }: Props) {
  const { t } = useLanguage();
  const formatted = formatSimulationAmountPair(amount);

  return (
    <article className="rounded-3xl border border-border bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-muted-foreground">
        {t("dashboardHome.labels.currentAssets")}
      </p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">{formatted.primary}</p>
      <p className="mt-2 text-sm text-muted-foreground">{formatted.exact}</p>
      <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {t("dashboardHome.labels.stockCaption")}
      </p>
    </article>
  );
}
