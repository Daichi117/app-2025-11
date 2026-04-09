"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { SavedSimulationPlan, SimulationFormValues, SimulationMode } from "../types";

type Props = {
  mode: SimulationMode;
  values: SimulationFormValues;
  canSubmit: boolean;
  hasSubmitted: boolean;
  savedPlan: SavedSimulationPlan | null;
  isLocked: boolean;
  isCurrentAssetsLoading: boolean;
  currentAssetsError: string | null;
  onModeChange: (mode: SimulationMode) => void;
  onChange: (field: keyof SimulationFormValues, value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
};

export default function SimulationForm({
  mode,
  values,
  canSubmit,
  hasSubmitted,
  savedPlan,
  isLocked,
  isCurrentAssetsLoading,
  currentAssetsError,
  onModeChange,
  onChange,
  onSubmit,
  onReset,
}: Props) {
  const { t } = useLanguage();
  const presetButtonClass =
    "px-3 py-1.5 rounded-full border border-border bg-white text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors disabled:cursor-not-allowed disabled:opacity-50";

  const modeButtonClass =
    "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border-2 disabled:cursor-not-allowed disabled:opacity-60";
  const inputClass =
    "w-full rounded-xl border-2 border-input px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all disabled:cursor-not-allowed disabled:bg-muted/30";

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold">{t("simulation.form.title")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("simulation.form.description")}
          </p>
          {savedPlan && (
            <p className="mt-2 text-sm text-primary">
              {t("simulation.form.savedStatus")}
            </p>
          )}
          {isLocked && (
            <p className="mt-2 text-sm text-muted-foreground">
              {t("simulation.form.lockedStatus")}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={isLocked}
            onClick={() => onModeChange("target")}
            className={`${modeButtonClass} ${
              mode === "target"
                ? "border-primary bg-primary text-white"
                : "border-border bg-white text-foreground hover:border-primary/40"
            }`}
          >
            {t("simulation.modes.target")}
          </button>
          <button
            type="button"
            disabled={isLocked}
            onClick={() => onModeChange("projection")}
            className={`${modeButtonClass} ${
              mode === "projection"
                ? "border-secondary bg-secondary text-white"
                : "border-border bg-white text-foreground hover:border-secondary/40"
            }`}
          >
            {t("simulation.modes.projection")}
          </button>
          {savedPlan && (
            <button
              type="button"
              onClick={onReset}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border-2 border-destructive/30 bg-white text-destructive hover:bg-destructive/5"
            >
              {t("simulation.form.reset")}
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            {t("simulation.form.targetAmount")}
          </span>
          <input
            type="number"
            min="0"
            value={values.targetAmount}
            onChange={(e) => onChange("targetAmount", e.target.value)}
            className={inputClass}
            disabled={isLocked}
          />
          <span className="mt-2 block text-xs text-muted-foreground">
            {t("simulation.form.currentValue").replace(
              "{value}",
              `￥${Number(values.targetAmount || 0).toLocaleString("ja-JP")}`
            )}
          </span>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            {t("simulation.form.currentAssets")}
          </span>
          <input
            type="number"
            min="0"
            value={values.currentAssets}
            readOnly
            className={inputClass}
            disabled
          />
          {currentAssetsError ? (
            <span className="mt-2 block text-xs text-destructive">
              {currentAssetsError}
            </span>
          ) : (
            <span className="mt-2 block text-xs text-muted-foreground">
              {isCurrentAssetsLoading
                ? t("simulation.form.currentAssetsLoading")
                : t("simulation.form.currentAssetsLinked").replace(
                    "{value}",
                    `￥${Number(values.currentAssets || 0).toLocaleString("ja-JP")}`
                  )}
            </span>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            {mode === "target"
              ? t("simulation.form.monthlyContributionOptional")
              : t("simulation.form.monthlyContribution")}
          </span>
          <input
            type="number"
            min="0"
            value={values.monthlyContribution}
            onChange={(e) => onChange("monthlyContribution", e.target.value)}
            className={inputClass}
            disabled={mode === "target" || isLocked}
          />
          <span className="mt-2 block text-xs text-muted-foreground">
            {mode === "target"
              ? t("simulation.form.autoCalculated")
              : t("simulation.form.currentValue").replace(
                  "{value}",
                  `￥${Number(values.monthlyContribution || 0).toLocaleString("ja-JP")}`
                )}
          </span>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            {t("simulation.form.years")}
          </span>
          <input
            type="number"
            min="1"
            value={values.years}
            onChange={(e) => onChange("years", e.target.value)}
            className={inputClass}
            disabled={isLocked}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {["5", "10", "15", "20"].map((preset) => (
              <button
                key={preset}
                type="button"
                disabled={isLocked}
                onClick={() => onChange("years", preset)}
                className={presetButtonClass}
              >
                {t("simulation.form.yearsPreset").replace("{years}", preset)}
              </button>
            ))}
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            {t("simulation.form.annualReturn")}
          </span>
          <input
            type="number"
            min="0"
            step="0.1"
            value={values.annualReturn}
            onChange={(e) => onChange("annualReturn", e.target.value)}
            className={inputClass}
            disabled={isLocked}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {["3", "5", "7"].map((preset) => (
              <button
                key={preset}
                type="button"
                disabled={isLocked}
                onClick={() => onChange("annualReturn", preset)}
                className={presetButtonClass}
              >
                {t("simulation.form.returnPreset").replace("{rate}", preset)}
              </button>
            ))}
          </div>
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-xl bg-muted/20 p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">
            {t("simulation.form.actionTitle")}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {hasSubmitted
              ? isLocked
                ? t("simulation.form.actionHintLocked")
                : t("simulation.form.actionHintAfter")
              : t("simulation.form.actionHintBefore")}
          </p>
          {!canSubmit && !isLocked && (
            <p className="mt-2 text-sm text-destructive">
              {currentAssetsError ?? (isCurrentAssetsLoading
                ? t("simulation.form.currentAssetsLoading")
                : t("simulation.form.validationHint"))}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            canSubmit
              ? "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
        >
          {t("simulation.form.submit")}
        </button>
      </div>
    </section>
  );
}
