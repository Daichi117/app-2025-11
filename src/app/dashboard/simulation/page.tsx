"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import SimulationForm from "@/features/dashboard/simulation/components/SimulationForm";
import SimulationResult from "@/features/dashboard/simulation/components/SimulationResult";
import SimulationAnalysisPanel from "@/features/dashboard/simulation/components/SimulationAnalysisPanel";
import ScenarioCards from "@/features/dashboard/simulation/components/ScenarioCards";
import SimulationChart from "@/features/dashboard/simulation/components/SimulationChart";
import SimulationYearTable from "@/features/dashboard/simulation/components/SimulationYearTable";
import SimulationEmptyState from "@/features/dashboard/simulation/components/SimulationEmptyState";
import { useSimulation } from "@/features/dashboard/simulation/hooks/useSimulation";

export default function SimulationPage() {
  const { t } = useLanguage();
  const {
    mode,
    formValues,
    result,
    analysis,
    isAnalysisLoading,
    analysisError,
    canSubmit,
    hasSubmitted,
    savedPlan,
    isCurrentAssetsLoading,
    currentAssetsError,
    handleModeChange,
    handleChange,
    handleSubmit,
    handleReset,
  } = useSimulation();

  return (
    <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      <section className="relative overflow-hidden rounded-[32px] border border-primary/15 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(15,118,110,0.16),_transparent_30%),linear-gradient(135deg,_rgba(255,255,255,1),_rgba(248,250,252,1))] p-8 shadow-sm">
        <div className="absolute inset-y-0 right-0 hidden w-72 bg-[linear-gradient(180deg,rgba(15,23,42,0.02),rgba(15,23,42,0.08))] md:block" />
        <div className="relative grid gap-8 lg:grid-cols-[1.5fr_0.9fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {t("simulation.hero.eyebrow")}
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("simulation.hero.title")}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
              {t("simulation.hero.description")}
            </p>
          </div>

          <div className="relative grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-border/70 backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t("simulation.hero.metric1Label")}
              </p>
              <p className="mt-2 text-xl font-bold text-foreground">
                {t("simulation.hero.metric1Value")}
              </p>
            </div>
            <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-border/70 backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t("simulation.hero.metric2Label")}
              </p>
              <p className="mt-2 text-xl font-bold text-foreground">
                {t("simulation.hero.metric2Value")}
              </p>
            </div>
            <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-border/70 backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t("simulation.hero.metric3Label")}
              </p>
              <p className="mt-2 text-xl font-bold text-foreground">
                {t("simulation.hero.metric3Value")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SimulationForm
        mode={mode}
        values={formValues}
        canSubmit={canSubmit}
        hasSubmitted={hasSubmitted}
        savedPlan={savedPlan}
        isLocked={Boolean(savedPlan)}
        isCurrentAssetsLoading={isCurrentAssetsLoading}
        currentAssetsError={currentAssetsError}
        onModeChange={handleModeChange}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />

      {result ? (
        <>
          <SimulationResult
            result={result}
          />
          <SimulationAnalysisPanel
            analysis={analysis}
            isLoading={isAnalysisLoading}
            error={analysisError}
          />
          <ScenarioCards
            mode={mode}
            scenarios={result.scenarios}
            targetAmount={result.targetAmount}
          />
          <SimulationChart data={result.chartData} />
          <SimulationYearTable data={result.chartData} />
        </>
      ) : (
        <SimulationEmptyState />
      )}
    </main>
  );
}
