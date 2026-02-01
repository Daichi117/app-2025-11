import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { verifyAccessToken } from "lib/auth";

export async function GET(req: Request) {
  try {
    // 1. トークン検証
    const userId = verifyAccessToken(req);

    // 2. ユーザー取得
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);

  } catch (err) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
