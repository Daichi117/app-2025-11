// app/api/household/income/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// app/api/household/expense/[id]/route.ts
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    let payload
    try {
      payload = verifyAccessToken(request)
    } catch {
      return NextResponse.json({ message: '認証が必要です' }, { status: 401 })
    }

    const { id } = await params

    const expense = await prisma.expense.findUnique({ where: { id } })  // ← expense
    if (!expense || expense.user_id !== payload.userId) {
      return NextResponse.json({ message: '見つかりません' }, { status: 404 })
    }

    await prisma.expense.delete({ where: { id } })  // ← expense

    return NextResponse.json({ message: '削除しました' })
  } catch (error) {
    return NextResponse.json({ message: 'サーバーエラー' }, { status: 500 })
  }
}