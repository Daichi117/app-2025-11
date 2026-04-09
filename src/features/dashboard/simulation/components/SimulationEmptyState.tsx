"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function SimulationEmptyState() {
  const { t } = useLanguage();

  return (
    <section className="rounded-2xl border border-dashed border-border bg-white p-10 shadow-sm">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-foreground">
          {t("simulation.empty.title")}
        </h2>
        <p className="mt-3 text-muted-foreground">
          {t("simulation.empty.description")}
        </p>
        <div className="mt-6 grid gap-3 text-left md:grid-cols-3">
          <div className="rounded-xl bg-card p-4 border border-border">
            <p className="text-sm font-semibold">{t("simulation.empty.step1Title")}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("simulation.empty.step1Body")}
            </p>
          </div>
          <div className="rounded-xl bg-card p-4 border border-border">
            <p className="text-sm font-semibold">{t("simulation.empty.step2Title")}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("simulation.empty.step2Body")}
            </p>
          </div>
          <div className="rounded-xl bg-card p-4 border border-border">
            <p className="text-sm font-semibold">{t("simulation.empty.step3Title")}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("simulation.empty.step3Body")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
