import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth";
import { getServerTranslator } from "@/i18n/serverTranslate";

// Household で扱うカテゴリ種別を API 側でも明示し、入力を絞る。
const VALID_TYPES = new Set(["INCOME", "FIXED", "VARIABLE"]);

function isValidType(value: unknown): value is "INCOME" | "FIXED" | "VARIABLE" {
  return typeof value === "string" && VALID_TYPES.has(value);
}

export async function GET(request: NextRequest) {
  const t = getServerTranslator(request);
  try {
    // すべてのカテゴリ操作はユーザー単位なので、最初に認証を通す。
    let payload;
    try {
      payload = verifyAccessToken(request);
    } catch {
      return NextResponse.json(
        { message: t("household.api.authRequired"), messageKey: "household.api.authRequired" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const typeParam = searchParams.get("type");

    // type 指定がある場合のみ絞り込み。未指定は全タイプを返す。
    const customCategories = await prisma.customCategory.findMany({
      where: {
        user_id: payload.userId,
        ...(isValidType(typeParam) ? { type: typeParam } : {}),
      },
      orderBy: [{ type: "asc" }, { name: "asc" }],
      select: {
        id: true,
        type: true,
        name: true,
      },
    });

    return NextResponse.json({ customCategories });
  } catch {
    return NextResponse.json(
      { message: t("household.api.serverError"), messageKey: "household.api.serverError" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const t = getServerTranslator(request);
  try {
    let payload;
    try {
      payload = verifyAccessToken(request);
    } catch {
      return NextResponse.json(
        { message: t("household.api.authRequired"), messageKey: "household.api.authRequired" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const rawType = body?.type;
    const rawName = body?.name;
    const name = typeof rawName === "string" ? rawName.trim() : "";

    if (!isValidType(rawType) || !name) {
      return NextResponse.json(
        { message: t("household.api.requiredFields"), messageKey: "household.api.requiredFields" },
        { status: 400 }
      );
    }

    const category = await prisma.customCategory.upsert({
      // 同名カテゴリの重複作成を防ぐため、(user_id, type, name) をキーにする。
      where: {
        user_id_type_name: {
          user_id: payload.userId,
          type: rawType,
          name,
        },
      },
      create: {
        user_id: payload.userId,
        type: rawType,
        name,
      },
      update: {},
      select: {
        id: true,
        type: true,
        name: true,
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: t("household.api.serverError"), messageKey: "household.api.serverError" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const t = getServerTranslator(request);
  try {
    let payload;
    try {
      payload = verifyAccessToken(request);
    } catch {
      return NextResponse.json(
        { message: t("household.api.authRequired"), messageKey: "household.api.authRequired" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const rawType = body?.type;
    const rawName = body?.name;
    const name = typeof rawName === "string" ? rawName.trim() : "";

    if (!isValidType(rawType)) {
      return NextResponse.json(
        { message: t("household.api.requiredFields"), messageKey: "household.api.requiredFields" },
        { status: 400 }
      );
    }

    if (name) {
      // 明細が残っているカテゴリは削除しない。
      // UI 上の選択肢を消しても実データが残ると、利用者が混乱するため。
      const remainingCount =
        rawType === "INCOME"
          ? await prisma.income.count({
              where: {
                user_id: payload.userId,
                category: name,
              },
            })
          : await prisma.expense.count({
              where: {
                user_id: payload.userId,
                type: rawType,
                category: name,
              },
            });

      if (remainingCount > 0) {
        // 409: 入力は正しいが業務ルール上いまは消せない。
        return NextResponse.json({ deletedCount: 0 }, { status: 409 });
      }
    }

    const deleted = await prisma.customCategory.deleteMany({
      where: {
        user_id: payload.userId,
        type: rawType,
        ...(name ? { name } : {}),
      },
    });

    return NextResponse.json({ deletedCount: deleted.count });
  } catch {
    return NextResponse.json(
      { message: t("household.api.serverError"), messageKey: "household.api.serverError" },
      { status: 500 }
    );
  }
}
