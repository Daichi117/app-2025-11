import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;
const ACCESS_TOKEN_EXPIRATION = 60 * 60;
export function SignAccessToken(payload:object) {
  return jwt.sign(payload,JWT_SECRET,{expiresIn:`${ACCESS_TOKEN_EXPIRATION}s`});
}

export function verifyAccessToken(req:Request | NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    return jwt.verify(token, JWT_SECRET);
  }
  const cookie = (req as Request).headers.get("cookie") ?? "";
  const match = cookie.match(/(?:^|;)token=([^;]+)/);
  const token = match ? match[1] : null;

  if(!token) {
    throw new Error("No token")
  };

  const payload = jwt.verify(token, JWT_SECRET) as any;
  return payload;
}
