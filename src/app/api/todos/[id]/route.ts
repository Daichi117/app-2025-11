import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerTranslator } from "@/i18n/serverTranslate";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function getPayload(request: NextRequest) {
  try {
    return verifyAccessToken(request);
  } catch {
    return null;
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const t = getServerTranslator(request);
  const payload = getPayload(request);

  if (!payload) {
    return NextResponse.json(
      { message: t("household.api.authRequired"), messageKey: "household.api.authRequired" },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const completed = Boolean(body.completed);

    const existing = await prisma.simulationTodo.findUnique({
      where: { id },
    });

    if (!existing || existing.user_id !== payload.userId) {
      return NextResponse.json(
        { message: t("household.api.serverError"), messageKey: "household.api.serverError" },
        { status: 404 }
      );
    }

    const todo = await prisma.simulationTodo.update({
      where: { id },
      data: { completed },
    });

    return NextResponse.json({ todo });
  } catch (error) {
    console.error("Todo PATCH failed:", error);
    return NextResponse.json(
      { message: t("household.api.serverError"), messageKey: "household.api.serverError" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const t = getServerTranslator(request);
  const payload = getPayload(request);

  if (!payload) {
    return NextResponse.json(
      { message: t("household.api.authRequired"), messageKey: "household.api.authRequired" },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;
    const existing = await prisma.simulationTodo.findUnique({
      where: { id },
    });

    if (!existing || existing.user_id !== payload.userId) {
      return NextResponse.json(
        { message: t("household.api.serverError"), messageKey: "household.api.serverError" },
        { status: 404 }
      );
    }

    await prisma.simulationTodo.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Todo DELETE failed:", error);
    return NextResponse.json(
      { message: t("household.api.serverError"), messageKey: "household.api.serverError" },
      { status: 500 }
    );
  }
}
