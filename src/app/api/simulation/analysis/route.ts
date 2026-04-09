import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";
import { getServerTranslator, resolveLocaleFromRequest } from "@/i18n/serverTranslate";
import { buildSimulationAnalysis } from "@/features/dashboard/simulation/server/analysis";

function getPayload(request: NextRequest) {
  try {
    return verifyAccessToken(request);
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const t = getServerTranslator(request);
  const payload = getPayload(request);

  if (!payload) {
    return NextResponse.json(
      { message: t("household.api.authRequired"), messageKey: "household.api.authRequired" },
      { status: 401 }
    );
  }

  try {
    const analysis = await buildSimulationAnalysis(
      payload.userId,
      resolveLocaleFromRequest(request)
    );

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Simulation analysis GET failed:", error);
    return NextResponse.json(
      { message: t("household.api.serverError"), messageKey: "household.api.serverError" },
      { status: 500 }
    );
  }
}
