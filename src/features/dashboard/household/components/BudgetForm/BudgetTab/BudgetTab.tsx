"use client"
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { FormType,INCOME_CATEGORIES,FIXED_EXPENSE_CATEGORIES,VARIABLE_EXPENSE_CATEGORIES } from '../../../types/form'
import { formatAmount } from '../../../utils/useBudgetMoney'
import { useBudgetItems } from '../../../hooks/useBudgetItems'
import BudgetCategoryRow from './BudgetCategoryRow'
import BudgetItemTable from './BudgetTable'
import toast from 'react-hot-toast'

type Props = {
  type: FormType
  refreshKey: number
}

export default function BudgetTab({ type, refreshKey }: Props) {
  const { t, language } = useLanguage()
  const { items, setItems } = useBudgetItems(type, refreshKey)  // ← データ取得
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const categories =
    type === 'INCOME'   ? INCOME_CATEGORIES :
    type === 'FIXED'    ? FIXED_EXPENSE_CATEGORIES :
                          VARIABLE_EXPENSE_CATEGORIES

  // 削除処理
  const handleDelete = async (id: string, memo: string | null, amount: number) => {
    const message = t("household.messages.confirmDelete")
      .replace("{item}", memo || "—")
      .replace("{amount}", formatAmount(amount))

    if (!confirm(message)) return

    const endpoint = type === 'INCOME'
      ? `/api/household/income/${id}`
      : `/api/household/expense/${id}`

    try {
      const res = await fetch(endpoint, { method: 'DELETE', credentials: 'include' })
      if (!res.ok) throw new Error()
      setItems(prev => prev.filter(item => item.id !== id))
      toast.success(t("household.messages.deleteSuccess"))
    } catch {
      toast.error(t("household.messages.deleteError"))
    }
  }

  // 件数フォーマット
  const formatCount = (count: number) =>
    t("household.messages.itemCount").replace("{count}", String(count))
 
  // 日付フォーマット
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-US')

  return (
    <div className="space-y-4 mt-6">
      {Object.entries(categories).map(([key, labelKey]) => {
        const categoryItems = items.filter(item => item.category === key)
        const total = categoryItems.reduce((sum, item) => sum + item.amount, 0)
        const isExpanded = expandedCategory === key

        return (
          <div key={key} className="bg-card rounded-lg border border-border shadow-sm">

            {/* ① カテゴリヘッダー行 */}
            <BudgetCategoryRow
              label={t(labelKey)}
              count={categoryItems.length}
              total={total}
              isExpanded={isExpanded}
              formatCount={formatCount}
              onClick={() => setExpandedCategory(isExpanded ? null : key)}
            />

            {/* ② 展開時テーブル */}
            {isExpanded && (
              <div className="border-t border-border p-5 bg-background/50">
                <BudgetItemTable
                  items={categoryItems}
                  formatDate={formatDate}
                  onDelete={handleDelete}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
// ```

// ---

// ### 役割分担
// ```
// BudgetTab（親）
//   ├── useBudgetItems    → DBからデータ取得
//   ├── handleDelete      → 削除ロジック
//   ├── formatCount       → 件数表示
//   ├── formatDate        → 日付表示
//   │
//   ├── BudgetCategoryRow → カテゴリヘッダーのUI
//   └── BudgetItemTable   → テーブルのUI