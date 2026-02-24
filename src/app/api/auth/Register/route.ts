import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { SignAccessToken } from "../../../../lib/auth";

export async function POST(req: Request) {
  try {
    // 1. フロント(HTML)から送られてきた値を受け取る
    const { name, email, password } = await req.json();

    // 【ロジック修正】!name に修正（名前がない場合にエラーを出す）
    if (!name || !email || !password) {
      return NextResponse.json({ message: "すべての項目を入力してください" }, { status: 400 });
    }

    // 2. データベースに同じメールの人がいないか確認
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ message: "このメールアドレスは既に登録されています" }, { status: 409 });
    }

    // 3. パスワードを暗号化
    const hashed = await bcrypt.hash(password, 12);

    // 4. データベースへ保存
    // 注意：ここを Prisma スキーマの変数名と完全に一致させる
    const user = await prisma.user.create({
      data: { 
        name: name, 
        email: email, 
        password_hash: hashed // スキーマが password_hash なのでこれにする
      },
    });

    // 5. ログイン用の「鍵（トークン）」を作成
    const token = SignAccessToken({ userId: user.id });

    // 6. レスポンス（返事）を作成
    const response = NextResponse.json(
      { id: user.id, email: user.email, name: user.name },
      { status: 201 }
    );

    // 7. クッキーをブラウザに保存（ログイン状態の維持）
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1時間
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("登録エラー:", err);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
}