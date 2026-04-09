"use client";

import { useEffect, useMemo, useState } from "react";
import { addYears, endOfMonth, format, startOfMonth, subMonths } from "date-fns";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchHouseholdCumulativeAssets } from "../../household/utils/fetchHouseholdCumulativeAssets";
import { SavedSimulationPlan } from "../../simulation/types";
import { calculateSimulationResult } from "../../simulation/utils/calculations";
import { fetchSimulationPlan } from "../../simulation/utils/planApi";
import {
  HomeDashboardData,
  HomeGoalDigest,
  HomeMonthSnapshot,
  HomeRecentItem,
} from "../types";

type IncomeItem = {
  id: string;
  amount: number;
  category: string;
  date: string;
};

type ExpenseItem = {
  id: string;
  amount: number;
  category: string;
  date: string;
  type: string;
};

function emptySnapshot(): HomeMonthSnapshot {
  return {
    income: 0,
    fixedExpense: 0,
    variableExpense: 0,
    totalExpense: 0,
    surplus: 0,
  };
}

async function fetchMonthSnapshot(startDate: Date, endDate: Date) {
  const start = startDate.toISOString();
  const end = endDate.toISOString();

  const [incomeRes, expenseRes] = await Promise.all([
    fetch(`/api/household/income?startDate=${start}&endDate=${end}`, { credentials: "include" }),
    fetch(`/api/household/expense?startDate=${start}&endDate=${end}`, { credentials: "include" }),
  ]);

  if (incomeRes.status === 401 || expenseRes.status === 401) {
    throw new Error("AUTH_REQUIRED");
  }

  const [incomeData, expenseData] = await Promise.all([incomeRes.json(), expenseRes.json()]);

  if (!incomeRes.ok || !expenseRes.ok) {
    throw new Error(incomeData.message || expenseData.message || "Failed to load dashboard data");
  }

  const income = (incomeData.incomes ?? []).reduce(
    (sum: number, item: { amount: number }) => sum + item.amount,
    0
  );

  const expenses = (expenseData.expenses ?? []) as ExpenseItem[];
  const fixedExpense = expenses
    .filter((item) => item.type === "FIXED")
    .reduce((sum, item) => sum + item.amount, 0);
  const variableExpense = expenses
    .filter((item) => item.type === "VARIABLE")
    .reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = fixedExpense + variableExpense;

  return {
    income,
    fixedExpense,
    variableExpense,
    totalExpense,
    surplus: income - totalExpense,
  };
}

async function fetchRecentItems(): Promise<HomeRecentItem[]> {
  const [incomeRes, expenseRes] = await Promise.all([
    fetch("/api/household/income", { credentials: "include" }),
    fetch("/api/household/expense", { credentials: "include" }),
  ]);

  if (incomeRes.status === 401 || expenseRes.status === 401) {
    throw new Error("AUTH_REQUIRED");
  }

  const [incomeData, expenseData] = await Promise.all([incomeRes.json(), expenseRes.json()]);

  if (!incomeRes.ok || !expenseRes.ok) {
    throw new Error(incomeData.message || expenseData.message || "Failed to load recent items");
  }

  const incomes = ((incomeData.incomes ?? []) as IncomeItem[]).map((item) => ({
    id: item.id,
    kind: "income" as const,
    category: item.category,
    amount: item.amount,
    date: item.date,
  }));

  const expenses = ((expenseData.expenses ?? []) as ExpenseItem[]).map((item) => ({
    id: item.id,
    kind: item.type === "FIXED" ? ("fixed" as const) : ("variable" as const),
    category: item.category,
    amount: item.amount,
    date: item.date,
  }));

  return [...incomes, ...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
}

function buildGoalDigest(
  plan: SavedSimulationPlan | null,
  currentAssets: number,
  currentMonth: HomeMonthSnapshot
): HomeGoalDigest | null {
  if (!plan) return null;

  const requiredMonthlyInvestment = calculateSimulationResult({
    mode: "target",
    targetAmount: plan.targetAmount,
    currentAssets,
    years: plan.years,
    annualReturn: plan.annualReturn,
    monthlyContribution: 0,
  }).monthlyContribution;

  const projectedFinalAssets = calculateSimulationResult({
    mode: "projection",
    targetAmount: plan.targetAmount,
    currentAssets,
    years: plan.years,
    annualReturn: plan.annualReturn,
    monthlyContribution: Math.max(currentMonth.surplus, 0),
  }).finalAmount;

  const monthlyGap = requiredMonthlyInvestment - currentMonth.surplus;

  return {
    plan,
    targetDateLabel: format(addYears(new Date(), plan.years), "yyyy/MM"),
    requiredMonthlyInvestment,
    projectedFinalAssets,
    monthlyGap,
    isOnTrack: monthlyGap <= 0,
  };
}

export function useHomeDashboard() {
  const { t } = useLanguage();
  const router = useRouter();
  const [currentAssets, setCurrentAssets] = useState(0);
  const [cumulativeIncome, setCumulativeIncome] = useState(0);
  const [cumulativeFixedExpense, setCumulativeFixedExpense] = useState(0);
  const [cumulativeVariableExpense, setCumulativeVariableExpense] = useState(0);
  const [currentMonth, setCurrentMonth] = useState<HomeMonthSnapshot>(emptySnapshot());
  const [previousMonth, setPreviousMonth] = useState<HomeMonthSnapshot>(emptySnapshot());
  const [recentItems, setRecentItems] = useState<HomeRecentItem[]>([]);
  const [plan, setPlan] = useState<SavedSimulationPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const now = new Date();
        const currentRange = {
          start: startOfMonth(now),
          end: endOfMonth(now),
        };
        const previousRangeDate = subMonths(now, 1);
        const previousRange = {
          start: startOfMonth(previousRangeDate),
          end: endOfMonth(previousRangeDate),
        };

        const [currentSnapshot, previousSnapshot, cumulativeAssetsData, recentActivity] =
          await Promise.all([
            fetchMonthSnapshot(currentRange.start, currentRange.end),
            fetchMonthSnapshot(previousRange.start, previousRange.end),
            fetchHouseholdCumulativeAssets(),
            fetchRecentItems(),
          ]);

        if (cancelled) return;

        setCurrentMonth(currentSnapshot);
        setPreviousMonth(previousSnapshot);
        setCurrentAssets(cumulativeAssetsData.cumulativeAssets);
        setCumulativeIncome(cumulativeAssetsData.totalIncome);
        setCumulativeFixedExpense(cumulativeAssetsData.totalFixedExpense);
        setCumulativeVariableExpense(cumulativeAssetsData.totalVariableExpense);
        setRecentItems(recentActivity);

        try {
          const savedPlan = await fetchSimulationPlan();
          if (cancelled) return;
          setPlan(savedPlan);
        } catch (planError) {
          if (cancelled) return;

          if (planError instanceof Error && planError.message === "AUTH_REQUIRED") {
            router.push("/login?mode=login");
            router.refresh();
            return;
          }

          console.error("Failed to load simulation plan for home dashboard:", planError);
          setPlan(null);
        }
      } catch (loadError) {
        if (cancelled) return;

        if (loadError instanceof Error && loadError.message === "AUTH_REQUIRED") {
          router.push("/login?mode=login");
          router.refresh();
          return;
        }

        setError(t("dashboardHome.states.error"));
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [router, t]);

  const data = useMemo<HomeDashboardData>(() => {
    const goalDigest = buildGoalDigest(plan, currentAssets, currentMonth);

    return {
      currentAssets,
      currentMonth,
      previousMonth,
      expenseBreakdown: {
        income: cumulativeIncome,
        fixed: cumulativeFixedExpense,
        variable: cumulativeVariableExpense,
        assets: currentAssets,
        total: cumulativeFixedExpense + cumulativeVariableExpense,
      },
      recentItems,
      goalDigest,
    };
  }, [
    cumulativeFixedExpense,
    cumulativeIncome,
    cumulativeVariableExpense,
    currentAssets,
    currentMonth,
    previousMonth,
    recentItems,
    plan,
  ]);

  return { data, isLoading, error };
}
