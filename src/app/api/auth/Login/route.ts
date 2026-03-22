// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { signAccessToken } from "@/lib/auth"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * エラーレスポンス共通関数
 */
function error(messageKey: string, status: number) {
  return NextResponse.json({ messageKey }, { status })
}

/**
 * 入力バリデーション
 */
function validateInput(email?: string, password?: string) {

  if (!email) {
    return "login.login.emailRequired"
  }

  if (!EMAIL_REGEX.test(email)) {
    return "login.login.emailInvalidFormat"
  }


  if (!password) {
    return "login.login.passwordTooShort"
  }

  return null
}

export async function POST(req: NextRequest) {

  try {

    // -----------------------------
    // 1. リクエストボディ取得
    // -----------------------------
    const body = await req.json().catch(() => null)
    const { email, password } = body ?? {}

    // -----------------------------
    // 2. バリデーション
    // -----------------------------
    const validationError = validateInput(email, password)

    if (validationError) {
      return error(validationError, 400)
    }

    // -----------------------------
    // 3. ユーザー検索
    // -----------------------------
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return error("login.emailInvalidFormat", 401)
    }

    // -----------------------------
    // 4. パスワード検証
    // -----------------------------
    const valid = await bcrypt.compare(password, user.password_hash)

    if (!valid) {
      return error("login.login.invalidCredentials", 401)
    }

    // -----------------------------
    // 5. JWT生成
    // -----------------------------
    const token = signAccessToken({
      userId: user.id
    })

    // -----------------------------
    // 6. レスポンス生成
    // -----------------------------
    const res = NextResponse.json(
      {
        ok: true,
        messageKey: "login.login.loginSuccess"
      },
      { status: 200 }
    )

    // -----------------------------
    // 7. Cookie保存
    // -----------------------------
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/"
    })

    return res

  } catch (err) {

    console.error("login error:", err)

    return error("login.login.serverError", 500)
  }
}