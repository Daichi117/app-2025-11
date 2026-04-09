import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { SimulationBudgetContext, SimulationCategoryInsight } from "../types";

type IncomeItem = {
  amount: number;
  category: string;
};

type ExpenseItem = {
  amount: number;
  category: string;
  type: string;
};

type PeriodDataset = {
  incomes: IncomeItem[];
  expenses: ExpenseItem[];
};

type PeriodSummary = {
  income: number;
  fixedExpense: number;
  variableExpense: number;
  surplus: number;
};

async function fetchPeriodDataset(startDate: Date, endDate: Date): Promise<PeriodDataset> {
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
    throw new Error(
      incomeData.message || expenseData.message || "Failed to load simulation budget context"
    );
  }

  return {
    incomes: (incomeData.incomes ?? []) as IncomeItem[],
    expenses: (expenseData.expenses ?? []) as ExpenseItem[],
  };
}

function summarizeDataset(dataset: PeriodDataset): PeriodSummary {
  const income = dataset.incomes.reduce((sum, item) => sum + item.amount, 0);
  const fixedExpense = dataset.expenses
    .filter((item) => item.type === "FIXED")
    .reduce((sum, item) => sum + item.amount, 0);
  const variableExpense = dataset.expenses
    .filter((item) => item.type === "VARIABLE")
    .reduce((sum, item) => sum + item.amount, 0);

  return {
    income,
    fixedExpense,
    variableExpense,
    surplus: income - fixedExpense - variableExpense,
  };
}

function averageSummaries(items: PeriodSummary[]): PeriodSummary {
  if (items.length === 0) {
    return {
      income: 0,
      fixedExpense: 0,
      variableExpense: 0,
      surplus: 0,
    };
  }

  return {
    income: items.reduce((sum, item) => sum + item.income, 0) / items.length,
    fixedExpense: items.reduce((sum, item) => sum + item.fixedExpense, 0) / items.length,
    variableExpense: items.reduce((sum, item) => sum + item.variableExpense, 0) / items.length,
    surplus: items.reduce((sum, item) => sum + item.surplus, 0) / items.length,
  };
}

function aggregateCategoryAmounts(
  datasets: PeriodDataset[]
): Map<string, { current: number; average: number; kind: "income" | "fixed" | "variable" }> {
  const map = new Map<
    string,
    { current: number; average: number; kind: "income" | "fixed" | "variable" }
  >();

  const currentDataset = datasets[0];
  const averageDatasets = datasets.slice(1);

  currentDataset.incomes.forEach((item) => {
    const key = `income:${item.category}`;
    const existing = map.get(key);
    map.set(key, {
      kind: "income",
      current: (existing?.current ?? 0) + item.amount,
      average: existing?.average ?? 0,
    });
  });

  currentDataset.expenses.forEach((item) => {
    const kind = item.type === "FIXED" ? "fixed" : "variable";
    const key = `${kind}:${item.category}`;
    const existing = map.get(key);
    map.set(key, {
      kind,
      current: (existing?.current ?? 0) + item.amount,
      average: existing?.average ?? 0,
    });
  });

  averageDatasets.forEach((dataset) => {
    dataset.incomes.forEach((item) => {
      const key = `income:${item.category}`;
      const existing = map.get(key);
      map.set(key, {
        kind: "income",
        current: existing?.current ?? 0,
        average: (existing?.average ?? 0) + item.amount / averageDatasets.length,
      });
    });

    dataset.expenses.forEach((item) => {
      const kind = item.type === "FIXED" ? "fixed" : "variable";
      const key = `${kind}:${item.category}`;
      const existing = map.get(key);
      map.set(key, {
        kind,
        current: existing?.current ?? 0,
        average: (existing?.average ?? 0) + item.amount / averageDatasets.length,
      });
    });
  });

  return map;
}

function buildInsights(datasets: PeriodDataset[]): SimulationCategoryInsight[] {
  const categoryAmounts = aggregateCategoryAmounts(datasets);

  return Array.from(categoryAmounts.entries())
    .map(([key, value]) => {
      const [, category] = key.split(":");
      const delta =
        value.kind === "income" ? value.average - value.current : value.current - value.average;

      return {
        category,
        kind: value.kind,
        currentAmount: value.current,
        averageAmount: value.average,
        delta,
      };
    })
    .sort((a, b) => b.delta - a.delta);
}

export async function fetchSimulationBudgetContext(): Promise<
  Omit<SimulationBudgetContext, "todos">
> {
  const now = new Date();
  const currentRange = {
    start: startOfMonth(now),
    end: endOfMonth(now),
  };
  const previousMonths = [1, 2, 3].map((offset) => {
    const monthDate = subMonths(now, offset);
    return {
      start: startOfMonth(monthDate),
      end: endOfMonth(monthDate),
    };
  });

  const datasets = await Promise.all([
    fetchPeriodDataset(currentRange.start, currentRange.end),
    ...previousMonths.map((range) => fetchPeriodDataset(range.start, range.end)),
  ]);

  const currentSummary = summarizeDataset(datasets[0]);
  const averageSummary = averageSummaries(datasets.slice(1).map(summarizeDataset));

  return {
    currentIncome: currentSummary.income,
    currentFixedExpense: currentSummary.fixedExpense,
    currentVariableExpense: currentSummary.variableExpense,
    currentSurplus: currentSummary.surplus,
    averageIncome: averageSummary.income,
    averageFixedExpense: averageSummary.fixedExpense,
    averageVariableExpense: averageSummary.variableExpense,
    averageSurplus: averageSummary.surplus,
    insights: buildInsights(datasets),
  };
}
