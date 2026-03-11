 "use client"; // クライアントサイドでの動作を明示

import DashboardHeader from "@/components/navigation/dashboardHeader";
import PeriodFilter from "@/features/dashboard/household/components/BudgetForm/BudgetButton";
import { TimePeriod } from "@/features/dashboard/household/components/BudgetForm/BudgetButton";
import { FormType } from "@/features/dashboard/household/types/form";
import SummaryCard   from "@/features/dashboard/household/components/SummaryCard";
import { useState } from "react";
import { HomeNav } from "@/components/home/HomeNav";
import BudgetContents from "@/features/dashboard/household/components/BudgetForm/BudgetContents";


export default function HouseholdPage() {
  // ① ロジック：共通の状態を親で管理する
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("monthly");
  const [activeForm, setActiveForm] = useState<FormType>("NONE");
  return (
    <>
    <HomeNav isLoggedIn={true} />
    <DashboardHeader />
     <main className="max-w-7xl mx-auto px-6 py-6 md:py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <PeriodFilter timePeriod={timePeriod} setTimePeriod={setTimePeriod} />
        </div>
      </div>
      <SummaryCard />
      <BudgetContents />
    </main>
    </>
   
  );
}