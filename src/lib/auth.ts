// lib/auth.ts
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;
const ACCESS_TOKEN_EXPIRATION = 100*100;

type JWTPayload = { userId: string };

// ── トークン生成 ──────────────────────────────
export function signAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
}

// ── Route Handler用（POST/GET APIで使う） ─────
export function verifyAccessToken(req: NextRequest): JWTPayload {
  // 1) Authorization ヘッダー（Bearer トークン）
  console.log('🍪 受信Cookie一覧:', req.cookies.getAll())
  console.log('🔑 Authヘッダー:', req.headers.get("authorization"))
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return jwt.verify(authHeader.substring(7), JWT_SECRET) as JWTPayload;
  }

  // 2) Cookie
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("No token");

  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

// ── Server Component / Server Action用 ───────
export async function verifyAccessTokenServer(): Promise<JWTPayload> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) throw new Error("No token");

  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}