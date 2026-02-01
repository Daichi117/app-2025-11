import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;
const ACCESS_TOKEN_EXPIRATION = 60 * 60; // 1時間（秒）

// 役割：ユーザーIDを「秘密の署名」付きの文字列（JWT）に変換する
export function SignAccessToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: `${ACCESS_TOKEN_EXPIRATION}s` });
}

// 役割：送られてきたリクエストから「鍵（トークン）」を探し、中身（ユーザーID）を取り出す
export function verifyAccessToken(req: Request | NextRequest) {
  // 1. Authorizationヘッダーを確認（スマホアプリ等からの通信用）
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    return jwt.verify(token, JWT_SECRET) as any;
  }

  // 2. クッキーを確認（ブラウザからの通信用）
  const cookie = (req as Request).headers.get("cookie") ?? "";
  const match = cookie.match(/(?:^|;)token=([^;]+)/);
  const token = match ? match[1] : null;

  if (!token) throw new Error("No token");

  // 署名が正しいか検証し、中身（payload）を返す
  return jwt.verify(token, JWT_SECRET) as any;
}