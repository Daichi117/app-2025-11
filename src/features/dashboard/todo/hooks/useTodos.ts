"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TodoItem } from "../types";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "../utils/todoApi";
import { useLanguage } from "@/contexts/LanguageContext";

export function useTodos() {
  const { t } = useLanguage();
  const router = useRouter();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAuthError = useCallback(
    (error: unknown) => {
      if (error instanceof Error && error.message === "AUTH_REQUIRED") {
        router.push("/login?mode=login");
        router.refresh();
        return true;
      }

      return false;
    },
    [router]
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const nextTodos = await fetchTodos();
        if (!cancelled) {
          setTodos(nextTodos);
        }
      } catch (loadError) {
        if (cancelled) return;

        if (handleAuthError(loadError)) {
          return;
        }

        setError(t("dashboardTodo.states.error"));
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [handleAuthError, t]);

  const handleCreate = async (input: {
    title: string;
    kind: string;
    category?: string | null;
    note?: string | null;
  }) => {
    try {
      const nextTodo = await createTodo(input);
      setTodos((prev) => [nextTodo, ...prev]);
    } catch (createError) {
      if (!handleAuthError(createError)) {
        setError(t("dashboardTodo.states.error"));
      }
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      const nextTodo = await updateTodo(id, completed);
      setTodos((prev) => prev.map((todo) => (todo.id === id ? nextTodo : todo)));
    } catch (updateError) {
      if (!handleAuthError(updateError)) {
        setError(t("dashboardTodo.states.error"));
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (deleteError) {
      if (!handleAuthError(deleteError)) {
        setError(t("dashboardTodo.states.error"));
      }
    }
  };

  return {
    todos,
    isLoading,
    error,
    handleCreate,
    handleToggle,
    handleDelete,
  };
}
