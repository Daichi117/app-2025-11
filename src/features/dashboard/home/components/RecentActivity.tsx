"use client";

import { format } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import { HomeRecentItem } from "../types";
import { formatSimulationExactAmount } from "../../simulation/utils/formatters";

type Props = {
  items: HomeRecentItem[];
};

function badgeClass(kind: HomeRecentItem["kind"]) {
  if (kind === "income") return "bg-secondary/10 text-secondary";
  if (kind === "fixed") return "bg-primary/10 text-primary";
  return "bg-amber-100 text-amber-700";
}

function badgeLabel(kind: HomeRecentItem["kind"], t: (key: string) => string) {
  if (kind === "income") return t("dashboardHome.labels.incomeBadge");
  if (kind === "fixed") return t("dashboardHome.labels.fixedBadge");
  return t("dashboardHome.labels.variableBadge");
}

export default function RecentActivity({ items }: Props) {
  const { t } = useLanguage();

  return (
    <section className="rounded-3xl border border-border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold">{t("dashboardHome.sections.recentActivity")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("dashboardHome.descriptions.recentActivity")}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {items.length > 0 ? (
          items.map((item) => (
            <article
              key={`${item.kind}-${item.id}`}
              className="flex items-center justify-between gap-4 rounded-2xl bg-muted/20 px-4 py-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass(item.kind)}`}>
                    {badgeLabel(item.kind, t)}
                  </span>
                  <p className="truncate text-sm font-medium text-foreground">{item.category}</p>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {format(new Date(item.date), "yyyy/MM/dd")}
                </p>
              </div>
              <p className="text-sm font-semibold text-foreground">
                {item.kind === "income" ? "+" : "-"}
                {formatSimulationExactAmount(item.amount)}
              </p>
            </article>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            {t("dashboardHome.states.noRecentActivity")}
          </div>
        )}
      </div>
    </section>
  );
}
