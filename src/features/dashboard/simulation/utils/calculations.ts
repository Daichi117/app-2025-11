import {
  RiskLevel,
  SimulationMode,
  SimulationResult,
  SimulationScenario,
  YearPoint,
} from "../types";

const SCENARIO_RATES: Record<RiskLevel, number> = {
  conservative: 0.03,
  balanced: 0.05,
  growth: 0.07,
};

function futureValue(
  currentAssets: number,
  monthlyContribution: number,
  annualReturn: number,
  years: number
): number {
  const months = years * 12;
  if (months <= 0) return currentAssets;

  const monthlyRate = annualReturn / 12;
  if (monthlyRate === 0) {
    return currentAssets + monthlyContribution * months;
  }

  const growth = Math.pow(1 + monthlyRate, months);
  return currentAssets * growth + monthlyContribution * ((growth - 1) / monthlyRate);
}

function requiredMonthlyContribution(
  targetAmount: number,
  currentAssets: number,
  annualReturn: number,
  years: number
): number {
  const months = years * 12;
  if (months <= 0) return 0;

  const monthlyRate = annualReturn / 12;
  if (monthlyRate === 0) {
    return Math.max((targetAmount - currentAssets) / months, 0);
  }

  const growth = Math.pow(1 + monthlyRate, months);
  const futureCurrentAssets = currentAssets * growth;
  const numerator = (targetAmount - futureCurrentAssets) * monthlyRate;
  const denominator = growth - 1;

  return Math.max(numerator / denominator, 0);
}

function buildChartData(
  currentAssets: number,
  monthlyContribution: number,
  annualReturn: number,
  years: number
): YearPoint[] {
  const points: YearPoint[] = [];

  for (let year = 0; year <= years; year += 1) {
    const assets = futureValue(currentAssets, monthlyContribution, annualReturn, year);
    const principal = currentAssets + monthlyContribution * year * 12;
    points.push({
      year,
      assets,
      principal,
      gains: Math.max(assets - principal, 0),
    });
  }

  return points;
}

function buildScenario(
  id: RiskLevel,
  mode: SimulationMode,
  targetAmount: number,
  currentAssets: number,
  years: number,
  fallbackMonthlyContribution: number
): SimulationScenario {
  const annualReturn = SCENARIO_RATES[id];
  const monthlyContribution =
    mode === "target"
      ? requiredMonthlyContribution(targetAmount, currentAssets, annualReturn, years)
      : fallbackMonthlyContribution;
  const finalAmount = futureValue(currentAssets, monthlyContribution, annualReturn, years);

  return {
    id,
    labelKey: `simulation.scenarios.${id}`,
    annualReturn,
    monthlyContribution,
    yearlyContribution: monthlyContribution * 12,
    finalAmount,
    years,
    feasible: finalAmount >= targetAmount,
    chartData: buildChartData(currentAssets, monthlyContribution, annualReturn, years),
  };
}

export function calculateSimulationResult(params: {
  mode: SimulationMode;
  targetAmount: number;
  currentAssets: number;
  monthlyContribution: number;
  years: number;
  annualReturn: number;
}): SimulationResult {
  const {
    mode,
    targetAmount,
    currentAssets,
    monthlyContribution: inputMonthlyContribution,
    years,
    annualReturn,
  } = params;

  const monthlyContribution =
    mode === "target"
      ? requiredMonthlyContribution(targetAmount, currentAssets, annualReturn, years)
      : inputMonthlyContribution;

  const finalAmount = futureValue(currentAssets, monthlyContribution, annualReturn, years);
  const principal = currentAssets + monthlyContribution * years * 12;
  const gains = Math.max(finalAmount - principal, 0);

  return {
    mode,
    targetAmount,
    currentAssets,
    years,
    annualReturn,
    monthlyContribution,
    yearlyContribution: monthlyContribution * 12,
    finalAmount,
    principal,
    gains,
    chartData: buildChartData(currentAssets, monthlyContribution, annualReturn, years),
    scenarios: (Object.keys(SCENARIO_RATES) as RiskLevel[]).map((riskLevel) =>
      buildScenario(
        riskLevel,
        mode,
        targetAmount,
        currentAssets,
        years,
        monthlyContribution
      )
    ),
  };
}
