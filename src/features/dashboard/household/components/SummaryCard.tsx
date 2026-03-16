"use client"
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import PeriodFilter, { TimePeriod } from './BudgetForm/BudgetButton'
import { usePeriodManager } from '../hooks/usePeriodManager'
import { useSummary } from '../hooks/useSummary'
import { formatAmount } from '../utils/useBudgetMoney'
import { PresetPeriod } from '../types/period'  // ← 追加

export default function SummaryCard() {
  const { t} = useLanguage()

  const [timePeriod, setTimePeriod] = useState<TimePeriod>('monthly')

  // TimePeriod → PresetPeriod に変換（customは monthly にフォールバック）
  const presetPeriod: PresetPeriod =
    timePeriod === 'custom' ? 'monthly' : timePeriod  // ← 追加

  const { periodInfo, setFilter } = usePeriodManager(presetPeriod)  // ← PresetPeriod を渡す
  const { summary} = useSummary(periodInfo)

  const summaryItems = [
    {
      id: "income",
      title: "household.summary.income",
      amount: summary.income,
      colorClass: "text-secondary",
    },
    {
      id: "expense",
      title: "household.summary.expense",
      amount: summary.expense,
      colorClass: "text-destructive",
    },
    {
      id: "surplus",
      title: "household.summary.surplus",
      amount: summary.surplus,
      colorClass: summary.surplus >= 0 ? "text-primary" : "text-destructive",
    },
  ]

  return (
    <div className="mb-8 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 md:p-8">
      <h2 className="mb-4 flex items-center gap-2">
        <span>📊</span>
        <span>{t("household.summary.total")}</span>
      </h2>

  <PeriodFilter
  timePeriod={timePeriod}
  setTimePeriod={(period) => {
    setTimePeriod(period)
    if (period !== 'custom') {
      setFilter({ type: 'preset', period })
    }
  }}
  onCustomRange={(start, end) => {
    setFilter({ type: 'custom', range: { start, end } })  // ← カスタム期間をセット
  }}
/>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {summaryItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg p-6 border shadow-sm">
            <div className="text-sm text-muted-foreground mb-2">
              {t(item.title)}
            </div>
            <div className={`text-2xl md:text-3xl font-bold ${item.colorClass}`}>
              { formatAmount(item.amount)}  {/* ← language追加 */}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-right">
        {periodInfo.label}
      </p>
    </div>
  )
}