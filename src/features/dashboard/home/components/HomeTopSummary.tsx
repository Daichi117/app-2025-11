"use client";

import AssetCard from "./AssetCard";
import CashflowCard from "./CashflowCard";
import MonthChangeCard from "./MonthChangeCard";
import { HomeMonthSnapshot } from "../types";

type Props = {
  currentAssets: number;
  currentMonth: HomeMonthSnapshot;
  previousMonth: HomeMonthSnapshot;
};

export default function HomeTopSummary({
  currentAssets,
  currentMonth,
  previousMonth,
}: Props) {
  return (
    <section className="grid gap-4 xl:grid-cols-[1fr_1.25fr_0.95fr]">
      <AssetCard amount={currentAssets} />
      <CashflowCard snapshot={currentMonth} />
      <MonthChangeCard
        currentSurplus={currentMonth.surplus}
        previousSurplus={previousMonth.surplus}
      />
    </section>
  );
}
