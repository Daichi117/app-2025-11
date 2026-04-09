// app/api/auth/Login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signAccessToken } from "@/lib/auth";
import { getServerTranslator } from "@/i18n/serverTranslate";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonError(
  t: ReturnType<typeof getServerTranslator>,
  messageKey: string,
  status: number
) {
  return NextResponse.json(
    { message: t(messageKey), messageKey },
    { status }
  );
}

/** Returns i18n key or null */
function validateInput(email?: string, password?: string): string | null {
  if (!email?.trim()) return "login.login.emailRequired";
  if (!EMAIL_REGEX.test(email)) return "login.login.emailInvalidFormat";
  if (!password) return "login.login.passwordRequired";
  return null;
}

export async function POST(req: NextRequest) {
  const t = getServerTranslator(req);

  try {
    const body = await req.json().catch(() => null);
    const { email, password } = body ?? {};

    const validationKey = validateInput(email, password);
    if (validationKey) {
      return jsonError(t, validationKey, 400);
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return jsonError(t, "login.login.invalidCredentials", 401);
    }

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return jsonError(t, "login.login.invalidCredentials", 401);
    }

    const token = signAccessToken({
      userId: user.id,
    });

    const res = NextResponse.json(
      {
        ok: true,
        message: t("login.login.loginSuccess"),
        messageKey: "login.login.loginSuccess",
      },
      { status: 200 }
    );

    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("login error:", err);
    return jsonError(t, "login.login.serverError", 500);
  }
}
