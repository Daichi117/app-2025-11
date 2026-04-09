 "use client"; // クライアントサイドでの動作を明示

import SummaryCard   from "@/features/dashboard/household/components/SummaryCard";
import BudgetContents from "@/features/dashboard/household/components/BudgetForm/BudgetContents";
import { RefetchProvider } from "@/contexts/RefetchContext";
import { CategoryProvider } from "@/contexts/ CategoryContext";
import { useState } from "react";
import { usePeriodManager } from "@/features/dashboard/household/hooks/usePeriodManager";
import { TimePeriod } from "@/features/dashboard/household/components/BudgetForm/BudgetButton";
import { PresetPeriod } from "@/features/dashboard/household/types/period";
export default function HouseholdPage() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("monthly");
  const presetPeriod: PresetPeriod = timePeriod === "custom" ? "monthly" : timePeriod;
  const { periodInfo, setFilter } = usePeriodManager(presetPeriod);

  return (
     <main className="max-w-7xl mx-auto px-6 py-6 ">
      <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
        </div>
      </div>
      <RefetchProvider>
        <CategoryProvider>
          <SummaryCard
            timePeriod={timePeriod}
            onTimePeriodChange={(period) => {
              setTimePeriod(period);
              if (period !== "custom") {
                setFilter({ type: "preset", period });
              }
            }}
            onCustomRange={(start, end) => {
              setFilter({ type: "custom", range: { start, end } });
            }}
            periodInfo={periodInfo}
          />
          <BudgetContents periodInfo={periodInfo} />
        </CategoryProvider>
      </RefetchProvider>
    </main>
  );
}
