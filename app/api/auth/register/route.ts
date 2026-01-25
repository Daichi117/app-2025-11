import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    // バリデーション
    if (!username || !email || !password) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    // 既存ユーザー確認
    const exists = await prisma.user.findUnique({ where: { email }});
    if (exists) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // パスワードハッシュ化
    const passwordHash = await bcrypt.hash(password, 12);

    // ユーザー作成
    const user = await prisma.user.create({
      data: { username, email, passwordHash }
    });

    // 最小限の情報を返す
    return NextResponse.json({ id: user.id, email: user.email, name: user.username }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
