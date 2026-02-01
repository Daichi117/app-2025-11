import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import bcrypt from "bcryptjs";
import { SignAccessToken } from "lib/auth"; // パスは環境に合わせて調整してください

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // トークン生成
    const token = SignAccessToken({ userId: user.id });

    // レスポンス作成
    const response = NextResponse.json({ ok: true });

    // 【改善】NextResponseのヘルパーでCookie設定（読みやすく安全）
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1時間
      path: "/",
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}