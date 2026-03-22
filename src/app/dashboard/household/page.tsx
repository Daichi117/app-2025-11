 "use client"; // クライアントサイドでの動作を明示

import DashboardHeader from "@/components/navigation/dashboardHeader";
import SummaryCard   from "@/features/dashboard/household/components/SummaryCard";
import { HomeNav } from "@/components/home/HomeNav";
import BudgetContents from "@/features/dashboard/household/components/BudgetForm/BudgetContents";
import { RefetchProvider } from "@/contexts/RefetchContext";
import { CategoryProvider } from "@/contexts/ CategoryContext";
export default function HouseholdPage() {
  // ① ロジック：共通の状態を親で管理する
  return (
    <>
    <HomeNav isLoggedIn={true} />
    <DashboardHeader />
     <main className="max-w-7xl mx-auto px-6 py-6 ">
      <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
        </div>
      </div>
      <RefetchProvider>
        <CategoryProvider>
            <SummaryCard />
        <BudgetContents />
        </CategoryProvider>
      
      </RefetchProvider>
    

    </main>
    </>
   
  );
}