// app/api/household/income/route.ts

import { NextRequest, NextResponse } from 'next/server';
import {  verifyAccessToken } from '@/lib/auth';  // ← 変更
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('━━━ 収入API: POST開始 ━━━');
    
    // ① 認証チェック（JWTトークンを検証）
    let payload;
    try {
      payload = verifyAccessToken(request);
      console.log('✅ 認証OK:', payload);
    } catch (error) {
      console.log('❌ 認証エラー:', error);
      return NextResponse.json(
        { message: '認証が必要です' },
        { status: 401 }
      );
    }
    
    const userId = payload.userId;
    console.log('✅ ユーザーID:', userId);
    
    // ② リクエストボディを取得
    const body = await request.json();
    console.log('📦 受信データ:', body);
    
    const { amount, category, date, memo } = body;
    
    // ③ バリデーション
    if (!amount || !category || !date) {
      return NextResponse.json(
        { message: '必須項目を入力してください' },
        { status: 400 }
      );
    }
    
    if (typeof amount !== 'number' || amount <= 0) {
      console.log('❌ バリデーションエラー: 金額が不正');
      return NextResponse.json(
        { message: '金額は0より大きい値を入力してください' },
        { status: 400 }
      );
    }
    
    console.log('✅ バリデーション成功');
    
    // ④ データベースに保存
    const income = await prisma.income.create({
      data: {
        user_id: userId,  // ← verifyAccessTokenから取得
        amount,
        category,
        date: new Date(date),
        memo: memo || null,
      },
    });
    
    console.log('✅ 保存成功:', income.id);
    console.log('━━━ 収入API: 完了 ━━━');
    
    // ⑤ レスポンスを返す
    return NextResponse.json(
      {
        message: '収入を追加しました',
        income: {
          id: income.id,
          amount: income.amount,
          category: income.category,
          date: income.date.toISOString(),
          memo: income.memo,
        },
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('❌ エラー発生:', error);
    
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'サーバーエラー',
      },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  try {
    let payload
    try {
      payload = verifyAccessToken(request)
    } catch {
      return NextResponse.json({ message: '認証が必要です' }, { status: 401 })
    }
    // 期間フィルター（なければ全件取得）
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const incomes = await prisma.income.findMany({
      where: {
        user_id: payload.userId,
        ...(startDate && endDate ? {
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          }
        } : {})
      },
      orderBy: { date: 'desc' },
    })

    return NextResponse.json({ incomes })
  

  } catch (error) {
    return NextResponse.json({ message: 'サーバーエラー' }, { status: 500 })
  }
  
}
