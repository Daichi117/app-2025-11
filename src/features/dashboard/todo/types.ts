export type TodoKind = "manual" | "income" | "fixed" | "variable";

export type TodoItem = {
  id: string;
  title: string;
  category: string | null;
  kind: string;
  note: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
};
