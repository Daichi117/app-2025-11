 "use client"; // クライアントサイドでの動作を明示

import DashboardHeader from "@/components/navigation/dashboardHeader";
import PeriodFilter from "@/features/dashboard/household/components/BudgetForm/BudgetButton";
import { TimePeriod } from "@/features/dashboard/household/components/BudgetForm/BudgetButton";
import BudgetTitle from "@/features/dashboard/household/components/BudgetForm/BudgetTitle";
import BudgetIncomeForm from "@/features/dashboard/household/components/BudgetForm/BudgetIncomeForm";
import BudgetExpenseForm from "@/features/dashboard/household/components/BudgetForm/BudgetExpenseForm";
import { FormType } from "@/features/dashboard/household/types/form";
import SummaryCard   from "@/features/dashboard/household/components/SummaryCard";
import { useState } from "react";
import { HomeNav } from "@/components/home/HomeNav";



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

      {/* BudgetTitle and forms: same width as dashboard header (max-w-7xl mx-auto px-6) */}
      <BudgetTitle
        activeForm={activeForm}
        onFormChange={(form) => setActiveForm(form)}
      />

      <div className="transition-all duration-300">
        {activeForm === "INCOME" && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <BudgetIncomeForm />
          </div>
        )}

        {activeForm === "FIXED" && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <BudgetExpenseForm type="FIXED" />
          </div>
        )}

        {activeForm === "VARIABLE" && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <BudgetExpenseForm type="VARIABLE" />
          </div>
        )}

        {activeForm === "NONE" && (
          <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl text-gray-400">
            <p className="text-lg font-medium">
              上のボタンから入力する項目を選んでください
            </p>
          </div>
        )}
      </div>
    </main>
    </>
   
  );
}