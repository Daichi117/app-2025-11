"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTodos } from "../hooks/useTodos";
import { TodoKind } from "../types";

function badgeClass(kind: string) {
  if (kind === "income") return "bg-secondary/10 text-secondary";
  if (kind === "fixed") return "bg-destructive/10 text-destructive";
  if (kind === "variable") return "bg-primary/10 text-primary";
  return "bg-muted text-muted-foreground";
}

function normalizeKind(kind: string): TodoKind {
  if (kind === "income" || kind === "fixed" || kind === "variable") {
    return kind;
  }

  return "manual";
}

export default function TodoDashboard() {
  const { t } = useLanguage();
  const { todos, isLoading, error, handleCreate, handleToggle, handleDelete } = useTodos();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [kind, setKind] = useState<TodoKind>("manual");
  const [category, setCategory] = useState("");

  const openCount = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos]);

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <section className="rounded-[32px] border border-border bg-white p-8 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {t("dashboardTodo.hero.eyebrow")}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("dashboardTodo.hero.title")}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          {t("dashboardTodo.hero.description")}
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">{t("dashboardTodo.form.title")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("dashboardTodo.form.description")}
          </p>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">{t("dashboardTodo.form.task")}</span>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder={t("dashboardTodo.form.taskPlaceholder")}
                className="w-full rounded-xl border border-input px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">{t("dashboardTodo.form.kind")}</span>
                <select
                  value={kind}
                  onChange={(event) => setKind(event.target.value as TodoKind)}
                  className="w-full rounded-xl border border-input bg-white px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="manual">{t("dashboardTodo.kind.manual")}</option>
                  <option value="income">{t("dashboardTodo.kind.income")}</option>
                  <option value="fixed">{t("dashboardTodo.kind.fixed")}</option>
                  <option value="variable">{t("dashboardTodo.kind.variable")}</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">{t("dashboardTodo.form.category")}</span>
                <input
                  type="text"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder={t("dashboardTodo.form.categoryPlaceholder")}
                  className="w-full rounded-xl border border-input px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">{t("dashboardTodo.form.note")}</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder={t("dashboardTodo.form.notePlaceholder")}
                rows={4}
                className="w-full rounded-xl border border-input px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <button
              type="button"
              onClick={() => {
                const nextTitle = title.trim();
                if (!nextTitle) return;

                void handleCreate({
                  title: nextTitle,
                  kind,
                  category: category.trim() || null,
                  note: note.trim() || null,
                });

                setTitle("");
                setNote("");
                setCategory("");
                setKind("manual");
              }}
              className="rounded-xl bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              {t("dashboardTodo.form.submit")}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">{t("dashboardTodo.list.title")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("dashboardTodo.list.description").replace("{count}", String(openCount))}
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="mt-5 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
              {t("dashboardTodo.states.loading")}
            </div>
          ) : error ? (
            <div className="mt-5 rounded-xl border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive">
              {error}
            </div>
          ) : todos.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">
              {t("dashboardTodo.states.empty")}
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {todos.map((todo) => (
                <article
                  key={todo.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 md:flex-row md:items-start md:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={(event) => void handleToggle(todo.id, event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border"
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p
                          className={`text-sm font-medium ${
                            todo.completed
                              ? "text-muted-foreground line-through"
                              : "text-foreground"
                          }`}
                        >
                          {todo.title}
                        </p>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${badgeClass(
                            todo.kind
                          )}`}
                        >
                          {t(`dashboardTodo.kind.${normalizeKind(todo.kind)}`)}
                        </span>
                        {todo.category ? (
                          <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                            {todo.category}
                          </span>
                        ) : null}
                      </div>
                      {todo.note ? (
                        <p className="mt-2 text-xs leading-6 text-muted-foreground">{todo.note}</p>
                      ) : null}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => void handleDelete(todo.id)}
                    className="text-sm font-semibold text-muted-foreground transition-colors hover:text-destructive"
                  >
                    {t("dashboardTodo.list.delete")}
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
