import { useEffect, useState } from 'react'
import { PeriodInfo } from '../types/period'
import { useAsyncState } from '@/components/household/hooks/useAsyncState'
import { useLanguage } from '@/contexts/LanguageContext'
type Summary = {
  income: number
  expense: number
  surplus: number
}

export function useSummary(periodInfo: PeriodInfo,refetchTrigger:number) {
  const { t } = useLanguage()
  const [summary, setSummary] = useState<Summary>({ income: 0, expense: 0, surplus: 0 })

  // ← useAsyncState を使う
  const { isLoading, execute } = useAsyncState({
    successMessage: '',        // サマリーはトーストなしでOK
    loadingMessage: t("household.messages.loading"),
    errorMessage: t("household.messages.deleteError"),
  })

  const start = periodInfo.startDate.toISOString()
  const end = periodInfo.endDate.toISOString()

  useEffect(() => {
    execute(async () => {
      const [incomeRes, expenseRes] = await Promise.all([
        fetch(`/api/household/income?startDate=${start}&endDate=${end}`, { credentials: 'include' }),
        fetch(`/api/household/expense?startDate=${start}&endDate=${end}`, { credentials: 'include' }),
      ])

      const [incomeData, expenseData] = await Promise.all([
        incomeRes.json(),
        expenseRes.json(),
      ])

      const income  = (incomeData.incomes   ?? []).reduce((sum: number, item: { amount: number }) => sum + item.amount, 0)
      const expense = (expenseData.expenses ?? []).reduce((sum: number, item: { amount: number }) => sum + item.amount, 0)
      setSummary({ income, expense, surplus: income - expense })
    })
  }, [end, execute, refetchTrigger, start])

  return { summary, isLoading }
}
