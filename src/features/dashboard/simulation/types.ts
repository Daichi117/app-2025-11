export type SimulationMode = "target" | "projection";

export type RiskLevel = "conservative" | "balanced" | "growth";

export type SimulationFormValues = {
  targetAmount: string;
  currentAssets: string;
  monthlyContribution: string;
  years: string;
  annualReturn: string;
};

export type YearPoint = {
  year: number;
  assets: number;
  principal: number;
  gains: number;
};

export type SimulationScenario = {
  id: RiskLevel;
  labelKey: string;
  annualReturn: number;
  monthlyContribution: number;
  yearlyContribution: number;
  finalAmount: number;
  years: number;
  feasible: boolean;
  chartData: YearPoint[];
};

export type SimulationResult = {
  mode: SimulationMode;
  targetAmount: number;
  currentAssets: number;
  years: number;
  annualReturn: number;
  monthlyContribution: number;
  yearlyContribution: number;
  finalAmount: number;
  principal: number;
  gains: number;
  chartData: YearPoint[];
  scenarios: SimulationScenario[];
};

export type SavedSimulationPlan = {
  targetAmount: number;
  monthlyContribution: number;
  years: number;
  annualReturn: number;
  lastMode: SimulationMode;
  updatedAt: string;
};

export type SimulationCategoryInsight = {
  category: string;
  kind: "income" | "fixed" | "variable";
  currentAmount: number;
  averageAmount: number;
  delta: number;
};

export type SimulationBudgetContext = {
  currentIncome: number;
  currentFixedExpense: number;
  currentVariableExpense: number;
  currentSurplus: number;
  averageIncome: number;
  averageFixedExpense: number;
  averageVariableExpense: number;
  averageSurplus: number;
  insights: SimulationCategoryInsight[];
};

export type SimulationAnalysisFocusArea = {
  category: string;
  kind: "income" | "fixed" | "variable";
  currentAmount: number;
  averageAmount: number;
  delta: number;
  note: string;
};

export type SimulationAnalysis = {
  source: "ai" | "rules";
  generatedAt: string;
  requiredMonthlySurplus: number;
  currentMonthIncome: number;
  currentMonthExpense: number;
  currentMonthSurplus: number;
  averageMonthlyIncome: number;
  averageMonthlyExpense: number;
  averageMonthlySurplus: number;
  monthlySurplusGap: number;
  requiredMonthlyIncome: number;
  allowableMonthlyExpense: number;
  targetFixedExpense: number;
  targetVariableExpense: number;
  narrative: string;
  nextAction: string;
  focusAreas: SimulationAnalysisFocusArea[];
};
