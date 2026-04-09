type HouseholdIncomeItem = {
  amount: number;
};

type HouseholdExpenseItem = {
  amount: number;
  type: string;
};

export type HouseholdCumulativeAssets = {
  totalIncome: number;
  totalExpense: number;
  totalFixedExpense: number;
  totalVariableExpense: number;
  cumulativeAssets: number;
};

export async function fetchHouseholdCumulativeAssets(): Promise<HouseholdCumulativeAssets> {
  const [incomeRes, expenseRes] = await Promise.all([
    fetch("/api/household/income", { credentials: "include" }),
    fetch("/api/household/expense", { credentials: "include" }),
  ]);

  if (incomeRes.status === 401 || expenseRes.status === 401) {
    throw new Error("AUTH_REQUIRED");
  }

  const [incomeData, expenseData] = await Promise.all([incomeRes.json(), expenseRes.json()]);

  if (!incomeRes.ok || !expenseRes.ok) {
    throw new Error(
      incomeData.message || expenseData.message || "Failed to load cumulative assets"
    );
  }

  const totalIncome = (incomeData.incomes ?? []).reduce(
    (sum: number, item: HouseholdIncomeItem) => sum + item.amount,
    0
  );
  const totalExpense = (expenseData.expenses ?? []).reduce(
    (sum: number, item: HouseholdExpenseItem) => sum + item.amount,
    0
  );
  const totalFixedExpense = (expenseData.expenses ?? []).reduce(
    (sum: number, item: HouseholdExpenseItem) =>
      item.type === "FIXED" ? sum + item.amount : sum,
    0
  );
  const totalVariableExpense = (expenseData.expenses ?? []).reduce(
    (sum: number, item: HouseholdExpenseItem) =>
      item.type === "VARIABLE" ? sum + item.amount : sum,
    0
  );

  return {
    totalIncome,
    totalExpense,
    totalFixedExpense,
    totalVariableExpense,
    cumulativeAssets: totalIncome - totalExpense,
  };
}
