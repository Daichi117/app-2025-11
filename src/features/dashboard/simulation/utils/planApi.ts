import { SavedSimulationPlan } from "../types";

type SaveSimulationPlanInput = Omit<SavedSimulationPlan, "updatedAt">;

async function parsePlanResponse(response: Response) {
  if (response.status === 401) {
    throw new Error("AUTH_REQUIRED");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to handle simulation plan");
  }

  return data;
}

export async function fetchSimulationPlan(): Promise<SavedSimulationPlan | null> {
  const response = await fetch("/api/simulation/save", {
    method: "GET",
    credentials: "include",
  });
  const data = await parsePlanResponse(response);
  return (data.plan ?? null) as SavedSimulationPlan | null;
}

export async function saveSimulationPlan(
  plan: SaveSimulationPlanInput
): Promise<SavedSimulationPlan> {
  const response = await fetch("/api/simulation/save", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });
  const data = await parsePlanResponse(response);
  return data.plan as SavedSimulationPlan;
}

export async function clearSimulationPlan(): Promise<void> {
  const response = await fetch("/api/simulation/save", {
    method: "DELETE",
    credentials: "include",
  });
  await parsePlanResponse(response);
}
