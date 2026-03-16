// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signAccessToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body ?? {};

    if (!name || !email || !password) {
      return NextResponse.json({ message: "すべての項目を入力してください" }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ message: "そのメールアドレスは既に使われています" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash: hashed,
      },
    });

    const token = signAccessToken({ userId: user.id });

    const res = NextResponse.json(
      { id: user.id, email: user.email, name: user.name },
      { status: 201 }
    );

    // Cookie をセット（必ず JSON を返す前にセット）
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1時間
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("register error:", err);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
}