import { TodoItem } from "../types";

async function parseTodoResponse(response: Response) {
  if (response.status === 401) {
    throw new Error("AUTH_REQUIRED");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to handle todo");
  }

  return data;
}

export async function fetchTodos(): Promise<TodoItem[]> {
  const response = await fetch("/api/todos", {
    method: "GET",
    credentials: "include",
  });
  const data = await parseTodoResponse(response);
  return (data.todos ?? []) as TodoItem[];
}

export async function createTodo(input: {
  title: string;
  kind: string;
  category?: string | null;
  note?: string | null;
}) {
  const response = await fetch("/api/todos", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const data = await parseTodoResponse(response);
  return data.todo as TodoItem;
}

export async function updateTodo(id: string, completed: boolean) {
  const response = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });
  const data = await parseTodoResponse(response);
  return data.todo as TodoItem;
}

export async function deleteTodo(id: string) {
  const response = await fetch(`/api/todos/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  await parseTodoResponse(response);
}
