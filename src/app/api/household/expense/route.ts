// app/api/household/expense/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerTranslator } from '@/i18n/serverTranslate';

export async function POST(request: NextRequest) {
  const t = getServerTranslator(request);
  try {
    console.log('━━━ 支出API: POST開始 ━━━');

    // 設計意図: 支出作成も income と同じく「認証 -> 検証 -> 保存」で統一する。
    let payload;
    try {
      payload = verifyAccessToken(request);
      console.log('✅ 認証OK:', payload);
    } catch (error) {
      console.log('❌ 認証エラー:', error);
      return NextResponse.json(
        { message: t('household.api.authRequired'), messageKey: 'household.api.authRequired' },
        { status: 401 }
      );
    }
    
    const userId = payload.userId;
    console.log('✅ ユーザーID:', userId);
    
    // ② リクエストボディを取得
    // Route Handler で受けた値を最終チェックして、不正入力をDBに入れない。
    const body = await request.json();
    console.log('📦 受信データ:', body);
    
    const { amount, type, category, date, memo } = body;
    
    // ③ バリデーション
    if (!amount || !type || !category || !date) {
      console.log('❌ バリデーションエラー: 必須項目が不足');
      return NextResponse.json(
        { message: t('household.api.requiredFields'), messageKey: 'household.api.requiredFields' },
        { status: 400 }
      );
    }

    if (typeof amount !== 'number' || amount <= 0) {
      console.log('❌ バリデーションエラー: 金額が不正');
      return NextResponse.json(
        { message: t('household.api.amountPositive'), messageKey: 'household.api.amountPositive' },
        { status: 400 }
      );
    }

    if (type !== 'FIXED' && type !== 'VARIABLE') {
      return NextResponse.json(
        { message: t('household.api.typeInvalid'), messageKey: 'household.api.typeInvalid' },
        { status: 400 }
      );
    }
    
    console.log('✅ バリデーション成功');
    
    // ④ データベースに保存
    // type(FIXED/VARIABLE) を保存して、後段の内訳分析や表示切替に使う。
    const expense = await prisma.expense.create({
      data: {
        user_id: userId,  // ← verifyAccessTokenから取得
        amount,
        type,
        category,
        date: new Date(date),
        memo: memo || null,
      },
    });
    
    console.log('✅ 保存成功:', expense.id);
    console.log('━━━ 支出API: 完了 ━━━');
    
    // ⑤ レスポンスを返す
    return NextResponse.json(
      {
        message: t('household.messages.expenseAdded'),
        messageKey: 'household.messages.expenseAdded',
        expense: {
          id: expense.id,
          amount: expense.amount,
          type: expense.type,
          category: expense.category,
          date: expense.date.toISOString(),
          memo: expense.memo,
        },
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('❌ エラー発生:', error);
    
    return NextResponse.json(
      {
        message: t('household.api.serverError'),
        messageKey: 'household.api.serverError',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const t = getServerTranslator(request);
  try {
    let payload
    try {
      payload = verifyAccessToken(request)
    } catch {
      return NextResponse.json({ message: t('household.api.authRequired'), messageKey: 'household.api.authRequired' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const startDate = searchParams.get('startDate')  // ← 追加
    const endDate = searchParams.get('endDate')        // ← 追加

    // type と期間の両方で絞れるようにして、一覧/集計で再利用できる形にする。
    const expenses = await prisma.expense.findMany({
      where: {
        user_id: payload.userId,
        ...(type ? { type } : {}),
        ...(startDate && endDate ? {  // ← 追加
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          }
        } : {})
      },
      orderBy: { date: 'desc' },
    })

    return NextResponse.json({ expenses })

  } catch {
    return NextResponse.json({ message: t('household.api.serverError'), messageKey: 'household.api.serverError' }, { status: 500 })
  }
}
