import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import bcrypt from "bcryptjs";
import { SignAccessToken } from "lib/auth";

const COOKIE_NAME = "token";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const token = SignAccessToken({ userId: user.id });

    // Set-Cookie ヘッダを返す（開発環境では Secure をつけない）
    const res = NextResponse.json({ ok: true });
    const isProd = process.env.NODE_ENV === "production";
    res.headers.set(
      "Set-Cookie",
      `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${60 * 60}; SameSite=Strict${isProd ? "; Secure" : ""}`
    );
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
