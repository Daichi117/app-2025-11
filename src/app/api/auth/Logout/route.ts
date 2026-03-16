// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 * -> cookie を消して OK を返す
 */
export async function POST() {
  const res = NextResponse.json({ ok: true });

  // Delete access token cookie
  res.cookies.set({
    name: "token",
    value: "",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });

  // Delete refresh token if you use one
  res.cookies.set({
    name: "refreshToken",
    value: "",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });

  return res;
}