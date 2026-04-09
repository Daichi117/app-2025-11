import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerTranslator } from "@/i18n/serverTranslate";

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
    const todos = await prisma.simulationTodo.findMany({
      where: { user_id: payload.userId },
      orderBy: [{ completed: "asc" }, { created_at: "desc" }],
    });

    return NextResponse.json({ todos });
  } catch (error) {
    console.error("Todo GET failed:", error);
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
    const title = String(body.title ?? "").trim();
    const kind = String(body.kind ?? "manual").trim();
    const category = body.category ? String(body.category).trim() : null;
    const note = body.note ? String(body.note).trim() : null;

    if (!title) {
      return NextResponse.json(
        { message: t("household.api.requiredFields"), messageKey: "household.api.requiredFields" },
        { status: 400 }
      );
    }

    const todo = await prisma.simulationTodo.create({
      data: {
        user_id: payload.userId,
        title,
        kind,
        category,
        note,
      },
    });

    return NextResponse.json({ todo }, { status: 201 });
  } catch (error) {
    console.error("Todo POST failed:", error);
    return NextResponse.json(
      { message: t("household.api.serverError"), messageKey: "household.api.serverError" },
      { status: 500 }
    );
  }
}
