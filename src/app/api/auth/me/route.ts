// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server"
import { verifyAccessToken } from "@/lib/auth"

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  if (!token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  try {
    const payload = verifyAccessToken(req)
    return NextResponse.json({ userId: payload.userId })
  } catch {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
}