"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  SimulationAnalysis,
  SavedSimulationPlan,
  SimulationFormValues,
  SimulationMode,
} from "../types";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchHouseholdCumulativeAssets } from "../../household/utils/fetchHouseholdCumulativeAssets";
import { calculateSimulationResult } from "../utils/calculations";
import {
  clearSimulationPlan,
  fetchSimulationPlan,
  saveSimulationPlan,
} from "../utils/planApi";
import { fetchSimulationAnalysis } from "../utils/analysisApi";

type SimulationParams = {
  mode: SimulationMode;
  targetAmount: number;
  currentAssets: number;
  monthlyContribution: number;
  years: number;
  annualReturn: number;
};

const DEFAULT_VALUES: Record<SimulationMode, SimulationFormValues> = {
  target: {
    targetAmount: "",
    currentAssets: "",
    monthlyContribution: "",
    years: "",
    annualReturn: "",
  },
  projection: {
    targetAmount: "",
    currentAssets: "",
    monthlyContribution: "",
    years: "",
    annualReturn: "",
  },
};

function toNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function buildValues(
  mode: SimulationMode,
  currentAssets: number,
  plan?: SavedSimulationPlan | null
): SimulationFormValues {
  const baseValues = {
    ...DEFAULT_VALUES[mode],
    currentAssets: String(currentAssets),
  };

  if (!plan) {
    return baseValues;
  }

  return {
    ...baseValues,
    targetAmount: String(plan.targetAmount),
    monthlyContribution: String(plan.monthlyContribution),
    years: String(plan.years),
    annualReturn: String(plan.annualReturn * 100),
  };
}

function buildSubmittedParamsFromPlan(
  plan: SavedSimulationPlan,
  currentAssets: number
): SimulationParams {
  return {
    mode: plan.lastMode,
    targetAmount: plan.targetAmount,
    currentAssets,
    monthlyContribution: plan.monthlyContribution,
    years: plan.years,
    annualReturn: plan.annualReturn,
  };
}

export function useSimulation() {
  const { t } = useLanguage();
  const router = useRouter();
  const [savedPlan, setSavedPlan] = useState<SavedSimulationPlan | null>(null);
  const [mode, setMode] = useState<SimulationMode>("target");
  const [formValues, setFormValues] = useState<SimulationFormValues>(DEFAULT_VALUES.target);
  const [currentAssets, setCurrentAssets] = useState<number>(0);
  const [analysis, setAnalysis] = useState<SimulationAnalysis | null>(null);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isCurrentAssetsLoading, setIsCurrentAssetsLoading] = useState(true);
  const [currentAssetsError, setCurrentAssetsError] = useState<string | null>(null);
  const [submittedParams, setSubmittedParams] = useState<SimulationParams | null>(null);

  const handleAuthError = useCallback((error: unknown) => {
    if (error instanceof Error && error.message === "AUTH_REQUIRED") {
      router.push("/login?mode=login");
      router.refresh();
      return true;
    }

    return false;
  }, [router]);

  useEffect(() => {
    let cancelled = false;

    async function loadSimulationState() {
      setIsCurrentAssetsLoading(true);
      setCurrentAssetsError(null);

      try {
        const cumulativeAssetsData = await fetchHouseholdCumulativeAssets();
        if (cancelled) return;

        const nextCurrentAssets = cumulativeAssetsData.cumulativeAssets;

        setCurrentAssets(nextCurrentAssets);
        setMode("target");
        setFormValues(buildValues("target", nextCurrentAssets, null));
        setSubmittedParams(null);
        setAnalysis(null);
        setAnalysisError(null);

        try {
          const savedPlanData = await fetchSimulationPlan();
          if (cancelled) return;

          const nextMode = savedPlanData?.lastMode ?? "target";
          setSavedPlan(savedPlanData);
          setMode(nextMode);
          setFormValues(buildValues(nextMode, nextCurrentAssets, savedPlanData));
          setSubmittedParams(
            savedPlanData ? buildSubmittedParamsFromPlan(savedPlanData, nextCurrentAssets) : null
          );
        } catch (planError) {
          if (cancelled) return;

          if (handleAuthError(planError)) {
            return;
          }

          console.error("Failed to load saved simulation plan:", planError);
          setSavedPlan(null);
          setMode("target");
          setFormValues(buildValues("target", nextCurrentAssets, null));
          setSubmittedParams(null);
        }
      } catch (error) {
        if (cancelled) return;

        if (handleAuthError(error)) {
          return;
        }

        setCurrentAssetsError(t("simulation.form.currentAssetsError"));
      } finally {
        if (!cancelled) {
          setIsCurrentAssetsLoading(false);
        }
      }
    }

    loadSimulationState();

    return () => {
      cancelled = true;
    };
  }, [handleAuthError, t]);

  useEffect(() => {
    let cancelled = false;

    async function loadAnalysis() {
      if (!savedPlan) {
        setAnalysis(null);
        setAnalysisError(null);
        setIsAnalysisLoading(false);
        return;
      }

      setIsAnalysisLoading(true);
      setAnalysisError(null);

      try {
        const nextAnalysis = await fetchSimulationAnalysis();
        if (cancelled) return;
        setAnalysis(nextAnalysis);
      } catch (error) {
        if (cancelled) return;

        if (handleAuthError(error)) {
          return;
        }

        console.error("Failed to load simulation analysis:", error);
        setAnalysis(null);
        setAnalysisError(t("simulation.analysis.error"));
      } finally {
        if (!cancelled) {
          setIsAnalysisLoading(false);
        }
      }
    }

    void loadAnalysis();

    return () => {
      cancelled = true;
    };
  }, [handleAuthError, savedPlan, t]);

  const handleModeChange = (nextMode: SimulationMode) => {
    if (savedPlan) return;
    setMode(nextMode);
    setFormValues((prev) => ({
      ...DEFAULT_VALUES[nextMode],
      targetAmount: prev.targetAmount,
      currentAssets: prev.currentAssets,
      years: prev.years,
      annualReturn: prev.annualReturn,
      monthlyContribution:
        nextMode === "projection"
          ? prev.monthlyContribution === "0"
            ? DEFAULT_VALUES.projection.monthlyContribution
            : prev.monthlyContribution
          : "0",
    }));
  };

  const handleChange = (field: keyof SimulationFormValues, value: string) => {
    if (savedPlan) return;
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const normalized = useMemo(() => {
    const targetAmount = Math.max(toNumber(formValues.targetAmount), 0);
    const currentAssets = toNumber(formValues.currentAssets);
    const monthlyContribution = Math.max(toNumber(formValues.monthlyContribution), 0);
    const years = Math.max(toNumber(formValues.years), 1);
    const annualReturn = Math.max(toNumber(formValues.annualReturn), 0) / 100;

    return {
      targetAmount,
      currentAssets,
      monthlyContribution,
      years,
      annualReturn,
    };
  }, [formValues]);

  const result = useMemo(
    () =>
      calculateSimulationResult({
        mode,
        ...normalized,
      }),
    [mode, normalized]
  );

  const submittedResult = useMemo(
    () => (submittedParams ? calculateSimulationResult(submittedParams) : null),
    [submittedParams]
  );

  const hasSubmitted = submittedResult !== null;

  const canSubmit =
    !isCurrentAssetsLoading &&
    !savedPlan &&
    currentAssetsError === null &&
    normalized.targetAmount > 0 &&
    normalized.years > 0 &&
    normalized.annualReturn >= 0 &&
    (mode === "target" || normalized.monthlyContribution > 0);

  const handleSubmit = () => {
    void (async () => {
      if (!canSubmit) return;
      const nextSubmittedParams = {
        mode,
        ...normalized,
      };
      const nextPlanInput = {
        targetAmount: normalized.targetAmount,
        monthlyContribution:
          mode === "target" ? result.monthlyContribution : normalized.monthlyContribution,
        years: normalized.years,
        annualReturn: normalized.annualReturn,
        lastMode: mode,
      };
      try {
        const nextPlan = await saveSimulationPlan(nextPlanInput);
        setSavedPlan(nextPlan);
        setSubmittedParams(buildSubmittedParamsFromPlan(nextPlan, nextSubmittedParams.currentAssets));
      } catch (error) {
        if (!handleAuthError(error)) {
          console.error("Failed to save simulation plan:", error);
        }
      }
    })();
  };

  const handleReset = () => {
    void (async () => {
      try {
        await clearSimulationPlan();
        setSavedPlan(null);
        setMode("target");
        setFormValues(buildValues("target", currentAssets, null));
        setSubmittedParams(null);
        setAnalysis(null);
        setAnalysisError(null);
      } catch (error) {
        if (!handleAuthError(error)) {
          console.error("Failed to reset simulation plan:", error);
        }
      }
    })();
  };

  return {
    mode,
    formValues,
    result: submittedResult,
    analysis,
    isAnalysisLoading,
    analysisError,
    hasSubmitted,
    canSubmit,
    savedPlan,
    isCurrentAssetsLoading,
    currentAssetsError,
    handleModeChange,
    handleChange,
    handleSubmit,
    handleReset,
  };
}
