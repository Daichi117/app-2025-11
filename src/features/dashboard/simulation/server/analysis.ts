import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { prisma } from "@/lib/prisma";
import { Language } from "@/i18n/types";
import { SimulationAnalysis, SimulationAnalysisFocusArea } from "../types";
import { calculateSimulationResult } from "../utils/calculations";

type IncomeRecord = {
  amount: number;
  category: string;
};

type ExpenseRecord = {
  amount: number;
  category: string;
  type: string;
};

type PeriodDataset = {
  incomes: IncomeRecord[];
  expenses: ExpenseRecord[];
};

type PeriodSummary = {
  income: number;
  fixedExpense: number;
  variableExpense: number;
  totalExpense: number;
  surplus: number;
};

type SavedPlanRecord = {
  target_amount: number;
  years: number;
  annual_return: number;
};

async function fetchCurrentAssets(userId: string): Promise<number> {
  const [incomeAggregate, expenseAggregate] = await Promise.all([
    prisma.income.aggregate({
      where: { user_id: userId },
      _sum: { amount: true },
    }),
    prisma.expense.aggregate({
      where: { user_id: userId },
      _sum: { amount: true },
    }),
  ]);

  return (incomeAggregate._sum.amount ?? 0) - (expenseAggregate._sum.amount ?? 0);
}

async function fetchPeriodDataset(
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<PeriodDataset> {
  const [incomes, expenses] = await Promise.all([
    prisma.income.findMany({
      where: {
        user_id: userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        amount: true,
        category: true,
      },
    }),
    prisma.expense.findMany({
      where: {
        user_id: userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        amount: true,
        category: true,
        type: true,
      },
    }),
  ]);

  return { incomes, expenses };
}

function summarizeDataset(dataset: PeriodDataset): PeriodSummary {
  const income = dataset.incomes.reduce((sum, item) => sum + item.amount, 0);
  const fixedExpense = dataset.expenses
    .filter((item) => item.type === "FIXED")
    .reduce((sum, item) => sum + item.amount, 0);
  const variableExpense = dataset.expenses
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

function averageSummaries(items: PeriodSummary[]): PeriodSummary {
  if (items.length === 0) {
    return {
      income: 0,
      fixedExpense: 0,
      variableExpense: 0,
      totalExpense: 0,
      surplus: 0,
    };
  }

  return {
    income: items.reduce((sum, item) => sum + item.income, 0) / items.length,
    fixedExpense: items.reduce((sum, item) => sum + item.fixedExpense, 0) / items.length,
    variableExpense: items.reduce((sum, item) => sum + item.variableExpense, 0) / items.length,
    totalExpense: items.reduce((sum, item) => sum + item.totalExpense, 0) / items.length,
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

function buildFocusAreas(
  datasets: PeriodDataset[],
  language: Language
): SimulationAnalysisFocusArea[] {
  return Array.from(aggregateCategoryAmounts(datasets).entries())
    .map(([key, value]) => {
      const [, category] = key.split(":");
      const delta =
        value.kind === "income" ? value.average - value.current : value.current - value.average;

      const note =
        language === "ja"
          ? value.kind === "income"
            ? `今月は平均より ${Math.round(delta).toLocaleString("ja-JP")} 円少ない状態です。`
            : `今月は平均より ${Math.round(delta).toLocaleString("ja-JP")} 円多く使っています。`
          : value.kind === "income"
            ? `This month is ${Math.round(delta).toLocaleString("en-US")} yen below the recent average.`
            : `This month is ${Math.round(delta).toLocaleString("en-US")} yen above the recent average.`;

      return {
        category,
        kind: value.kind,
        currentAmount: value.current,
        averageAmount: value.average,
        delta,
        note,
      };
    })
    .filter((item) => item.delta > 0)
    .sort((a, b) => b.delta - a.delta)
    .slice(0, 5);
}

function buildRuleNarrative(
  language: Language,
  requiredMonthlySurplus: number,
  averageMonthlySurplus: number,
  monthlySurplusGap: number
) {
  if (language === "ja") {
    if (monthlySurplusGap <= 0) {
      return {
        summary: `目標達成に必要な月間余剰資金は ${Math.round(requiredMonthlySurplus).toLocaleString("ja-JP")} 円です。直近3か月平均の余剰資金でおおむねまかなえています。`,
        nextAction:
          "この水準を維持できているかを確認しつつ、気になるカテゴリだけ todo タブで管理するのがおすすめです。",
      };
    }

    return {
      summary: `目標達成には月 ${Math.round(requiredMonthlySurplus).toLocaleString("ja-JP")} 円の余剰資金が必要です。直近3か月平均は ${Math.round(averageMonthlySurplus).toLocaleString("ja-JP")} 円なので、あと ${Math.round(monthlySurplusGap).toLocaleString("ja-JP")} 円の改善余地があります。`,
      nextAction:
        "収入を増やすのか、固定費を減らすのか、変動費を減らすのかを比較しながら todo タブに整理してください。",
    };
  }

  if (monthlySurplusGap <= 0) {
    return {
      summary: `This goal needs about ${Math.round(requiredMonthlySurplus).toLocaleString("en-US")} yen of monthly surplus, and your recent three-month average is already covering it.`,
      nextAction:
        "Keep the current pace stable and move only the categories you want to watch into the todo tab.",
    };
  }

  return {
    summary: `This goal needs about ${Math.round(requiredMonthlySurplus).toLocaleString("en-US")} yen of monthly surplus. Your recent three-month average is ${Math.round(averageMonthlySurplus).toLocaleString("en-US")} yen, so there is still a gap of ${Math.round(monthlySurplusGap).toLocaleString("en-US")} yen per month.`,
    nextAction:
      "Compare whether income growth, fixed-cost reduction, or variable-cost reduction is the best lever, then capture the action items in the todo tab.",
  };
}

async function buildOpenAiNarrative(input: {
  language: Language;
  requiredMonthlySurplus: number;
  averageMonthlySurplus: number;
  monthlySurplusGap: number;
  requiredMonthlyIncome: number;
  allowableMonthlyExpense: number;
  targetFixedExpense: number;
  targetVariableExpense: number;
  focusAreas: SimulationAnalysisFocusArea[];
}): Promise<{
  summary: string;
  nextAction: string;
  focusNotes: Array<{ category: string; kind: "income" | "fixed" | "variable"; note: string }>;
} | null> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const localeInstruction =
    input.language === "ja"
      ? "Respond in natural Japanese for a household budgeting and investing app."
      : "Respond in natural English for a household budgeting and investing app.";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            `${localeInstruction} Return strict JSON only. Keep the tone concise, supportive, and actionable.`,
        },
        {
          role: "user",
          content: JSON.stringify({
            requiredMonthlySurplus: input.requiredMonthlySurplus,
            averageMonthlySurplus: input.averageMonthlySurplus,
            monthlySurplusGap: input.monthlySurplusGap,
            requiredMonthlyIncome: input.requiredMonthlyIncome,
            allowableMonthlyExpense: input.allowableMonthlyExpense,
            targetFixedExpense: input.targetFixedExpense,
            targetVariableExpense: input.targetVariableExpense,
            focusAreas: input.focusAreas.map((area) => ({
              category: area.category,
              kind: area.kind,
              currentAmount: area.currentAmount,
              averageAmount: area.averageAmount,
              delta: area.delta,
            })),
          }),
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "simulation_analysis",
          strict: true,
          schema: {
            type: "object",
            properties: {
              summary: { type: "string" },
              nextAction: { type: "string" },
              focusNotes: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    category: { type: "string" },
                    kind: { type: "string", enum: ["income", "fixed", "variable"] },
                    note: { type: "string" },
                  },
                  required: ["category", "kind", "note"],
                  additionalProperties: false,
                },
              },
            },
            required: ["summary", "nextAction", "focusNotes"],
            additionalProperties: false,
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("OpenAI simulation analysis failed:", errorText);
    return null;
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (typeof content !== "string") {
    return null;
  }

  try {
    return JSON.parse(content) as {
      summary: string;
      nextAction: string;
      focusNotes: Array<{ category: string; kind: "income" | "fixed" | "variable"; note: string }>;
    };
  } catch (error) {
    console.error("OpenAI simulation analysis parse failed:", error);
    return null;
  }
}

export async function buildSimulationAnalysis(
  userId: string,
  language: Language
): Promise<SimulationAnalysis | null> {
  const savedPlan = (await prisma.simulationPlan.findUnique({
    where: { user_id: userId },
    select: {
      target_amount: true,
      years: true,
      annual_return: true,
    },
  })) as SavedPlanRecord | null;

  if (!savedPlan) {
    return null;
  }

  const currentAssets = await fetchCurrentAssets(userId);

  const now = new Date();
  const currentRange = {
    start: startOfMonth(now),
    end: endOfMonth(now),
  };
  const previousRanges = [1, 2, 3].map((offset) => {
    const date = subMonths(now, offset);
    return {
      start: startOfMonth(date),
      end: endOfMonth(date),
    };
  });

  const [currentDataset, ...previousDatasets] = await Promise.all([
    fetchPeriodDataset(userId, currentRange.start, currentRange.end),
    ...previousRanges.map((range) => fetchPeriodDataset(userId, range.start, range.end)),
  ]);

  const currentSummary = summarizeDataset(currentDataset);
  const averageSummary = averageSummaries(previousDatasets.map(summarizeDataset));
  const requiredMonthlySurplus = calculateSimulationResult({
    mode: "target",
    targetAmount: savedPlan.target_amount,
    currentAssets,
    years: savedPlan.years,
    annualReturn: savedPlan.annual_return,
    monthlyContribution: 0,
  }).monthlyContribution;
  const monthlySurplusGap = Math.max(requiredMonthlySurplus - averageSummary.surplus, 0);
  const requiredMonthlyIncome = averageSummary.totalExpense + requiredMonthlySurplus;
  const allowableMonthlyExpense = Math.max(averageSummary.income - requiredMonthlySurplus, 0);
  const targetFixedExpense = Math.max(averageSummary.fixedExpense - monthlySurplusGap, 0);
  const targetVariableExpense = Math.max(averageSummary.variableExpense - monthlySurplusGap, 0);
  const focusAreas = buildFocusAreas([currentDataset, ...previousDatasets], language);
  const fallbackNarrative = buildRuleNarrative(
    language,
    requiredMonthlySurplus,
    averageSummary.surplus,
    monthlySurplusGap
  );
  const aiNarrative = await buildOpenAiNarrative({
    language,
    requiredMonthlySurplus,
    averageMonthlySurplus: averageSummary.surplus,
    monthlySurplusGap,
    requiredMonthlyIncome,
    allowableMonthlyExpense,
    targetFixedExpense,
    targetVariableExpense,
    focusAreas,
  });

  const mergedFocusAreas = aiNarrative
    ? focusAreas.map((area) => ({
        ...area,
        note:
          aiNarrative.focusNotes.find(
            (item) => item.category === area.category && item.kind === area.kind
          )?.note ?? area.note,
      }))
    : focusAreas;

  return {
    source: aiNarrative ? "ai" : "rules",
    generatedAt: new Date().toISOString(),
    requiredMonthlySurplus,
    currentMonthIncome: currentSummary.income,
    currentMonthExpense: currentSummary.totalExpense,
    currentMonthSurplus: currentSummary.surplus,
    averageMonthlyIncome: averageSummary.income,
    averageMonthlyExpense: averageSummary.totalExpense,
    averageMonthlySurplus: averageSummary.surplus,
    monthlySurplusGap,
    requiredMonthlyIncome,
    allowableMonthlyExpense,
    targetFixedExpense,
    targetVariableExpense,
    narrative: aiNarrative?.summary ?? fallbackNarrative.summary,
    nextAction: aiNarrative?.nextAction ?? fallbackNarrative.nextAction,
    focusAreas: mergedFocusAreas,
  };
}
