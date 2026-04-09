import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerTranslator } from '@/i18n/serverTranslate'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const t = getServerTranslator(request)
  try {
    let payload
    try {
      payload = verifyAccessToken(request)
    } catch {
      return NextResponse.json(
        { message: t('household.api.authRequired'), messageKey: 'household.api.authRequired' },
        { status: 401 }
      )
    }

    const { id } = await params

    const expense = await prisma.expense.findUnique({ where: { id } })
    if (!expense || expense.user_id !== payload.userId) {
      return NextResponse.json(
        { message: t('household.api.notFound'), messageKey: 'household.api.notFound' },
        { status: 404 }
      )
    }

    await prisma.expense.delete({ where: { id } })

    return NextResponse.json({
      message: t('household.messages.deleteSuccess'),
      messageKey: 'household.messages.deleteSuccess',
    })
  } catch {
    return NextResponse.json(
      { message: t('household.api.serverError'), messageKey: 'household.api.serverError' },
      { status: 500 }
    )
  }
}
