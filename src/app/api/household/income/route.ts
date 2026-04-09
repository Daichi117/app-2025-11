// app/api/household/income/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerTranslator } from '@/i18n/serverTranslate';

export async function POST(request: NextRequest) {
  const t = getServerTranslator(request);
  try {
    console.log('━━━ 収入API: POST開始 ━━━');

    // 設計意図: 収入作成は必ず「認証 -> バリデーション -> 永続化」の順に通す。
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
    // 型安全はランタイムで担保するため、受信後に必須項目を検証する。
    const body = await request.json();
    console.log('📦 受信データ:', body);
    
    const { amount, category, date, memo } = body;
    
    // ③ バリデーション
    if (!amount || !category || !date) {
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
    
    console.log('✅ バリデーション成功');
    
    // ④ データベースに保存
    // user_id はトークン由来のみを使い、他ユーザーIDのなりすまし入力を防ぐ。
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
        message: t('household.messages.incomeAdded'),
        messageKey: 'household.messages.incomeAdded',
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
    // 期間フィルター（なければ全件取得）
    // この分岐で「集計の期間」と「一覧の期間」を揃えやすくしている。
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
  

  } catch {
    return NextResponse.json({ message: t('household.api.serverError'), messageKey: 'household.api.serverError' }, { status: 500 })
  }

}
