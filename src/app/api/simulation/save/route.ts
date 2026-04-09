import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerTranslator } from "@/i18n/serverTranslate";

function normalizePlan(plan: {
  target_amount: number;
  monthly_contribution: number;
  years: number;
  annual_return: number;
  last_mode: string;
  updated_at: Date;
}) {
  return {
    targetAmount: plan.target_amount,
    monthlyContribution: plan.monthly_contribution,
    years: plan.years,
    annualReturn: plan.annual_return,
    lastMode: plan.last_mode,
    updatedAt: plan.updated_at.toISOString(),
  };
}

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
    const plan = await prisma.simulationPlan.findUnique({
      where: { user_id: payload.userId },
    });

    return NextResponse.json({
      plan: plan ? normalizePlan(plan) : null,
    });
  } catch (error) {
    console.error("Simulation plan GET failed:", error);
    return NextResponse.json(
      { message: t("household.api.serverError"), messageKey: "household.api.serverError" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const t = getServerTranslator(request);
  const payload = getPayload(request);

  if (!payload) {
    return NextResponse.json(
      { message: t("household.api.authRequired"), messageKey: "household.api.authRequired" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const targetAmount = Number(body.targetAmount);
    const monthlyContribution = Number(body.monthlyContribution);
    const years = Number(body.years);
    const annualReturn = Number(body.annualReturn);
    const lastMode = body.lastMode;

    if (
      !Number.isFinite(targetAmount) ||
      !Number.isFinite(monthlyContribution) ||
      !Number.isFinite(years) ||
      !Number.isFinite(annualReturn) ||
      (lastMode !== "target" && lastMode !== "projection")
    ) {
      return NextResponse.json(
        { message: t("household.api.requiredFields"), messageKey: "household.api.requiredFields" },
        { status: 400 }
      );
    }

    const plan = await prisma.simulationPlan.upsert({
      where: { user_id: payload.userId },
      update: {
        target_amount: Math.max(targetAmount, 0),
        monthly_contribution: Math.max(monthlyContribution, 0),
        years: Math.max(Math.round(years), 1),
        annual_return: Math.max(annualReturn, 0),
        last_mode: lastMode,
      },
      create: {
        user_id: payload.userId,
        target_amount: Math.max(targetAmount, 0),
        monthly_contribution: Math.max(monthlyContribution, 0),
        years: Math.max(Math.round(years), 1),
        annual_return: Math.max(annualReturn, 0),
        last_mode: lastMode,
      },
    });

    return NextResponse.json({
      message: "Simulation plan saved",
      plan: normalizePlan(plan),
    });
  } catch (error) {
    console.error("Simulation plan POST failed:", error);
    return NextResponse.json(
      { message: t("household.api.serverError"), messageKey: "household.api.serverError" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const t = getServerTranslator(request);
  const payload = getPayload(request);

  if (!payload) {
    return NextResponse.json(
      { message: t("household.api.authRequired"), messageKey: "household.api.authRequired" },
      { status: 401 }
    );
  }

  try {
    await prisma.simulationPlan.deleteMany({
      where: { user_id: payload.userId },
    });

    return NextResponse.json({ message: "Simulation plan deleted" });
  } catch (error) {
    console.error("Simulation plan DELETE failed:", error);
    return NextResponse.json(
      { message: t("household.api.serverError"), messageKey: "household.api.serverError" },
      { status: 500 }
    );
  }
}
