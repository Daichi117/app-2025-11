import { SimulationAnalysis } from "../types";

async function parseAnalysisResponse(response: Response) {
  if (response.status === 401) {
    throw new Error("AUTH_REQUIRED");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load simulation analysis");
  }

  return data;
}

export async function fetchSimulationAnalysis(): Promise<SimulationAnalysis | null> {
  const response = await fetch("/api/simulation/analysis", {
    method: "GET",
    credentials: "include",
  });
  const data = await parseAnalysisResponse(response);
  return (data.analysis ?? null) as SimulationAnalysis | null;
}
