import { SavedSimulationPlan } from "../simulation/types";

export type HomeMonthSnapshot = {
  income: number;
  fixedExpense: number;
  variableExpense: number;
  totalExpense: number;
  surplus: number;
};

export type HomeDashboardData = {
  currentAssets: number;
  currentMonth: HomeMonthSnapshot;
  previousMonth: HomeMonthSnapshot;
  expenseBreakdown: {
    income: number;
    fixed: number;
    variable: number;
    assets: number;
    total: number;
  };
  recentItems: HomeRecentItem[];
  goalDigest: HomeGoalDigest | null;
};

export type HomeRecentItem = {
  id: string;
  kind: "income" | "fixed" | "variable";
  category: string;
  amount: number;
  date: string;
};

export type HomeGoalDigest = {
  plan: SavedSimulationPlan;
  targetDateLabel: string;
  requiredMonthlyInvestment: number;
  projectedFinalAssets: number;
  monthlyGap: number;
  isOnTrack: boolean;
};
