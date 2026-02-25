"use client"; // クライアントサイドでの動作を明示

import PeriodFilter from "@/features/dashboard/household/component/dailyButton";
import { TimePeriod } from "@/features/dashboard/household/utils/constants";
import { useState } from "react";

export default function HouseholdPage() {
  // ① ロジック：共通の状態を親で管理する
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('monthly');

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
      <div className='mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {/* ② 解決：必要な値（Props）をすべて渡す */}
          <PeriodFilter 
            timePeriod={timePeriod} 
            setTimePeriod={setTimePeriod} 
          />
        </div>
      </div>
    </main>
  );
}