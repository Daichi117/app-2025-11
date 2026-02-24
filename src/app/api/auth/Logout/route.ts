import { NextResponse } from "next/server";
const COOKIE_NAME = "token";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // 0にして即失効
  res.headers.set("Set-Cookie", `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`);
  return res;
}
