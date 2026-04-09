"use client"
import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { FormType } from '../../../types/form'
import { formatAmount } from '../../../utils/useBudgetMoney'
import { useBudgetItems } from '../../../hooks/useBudgetItems'
import BudgetCategoryRow from './BudgetCategoryRow'
import BudgetItemTable from './BudgetTable'
import toast from 'react-hot-toast'
import { useCategory } from '@/contexts/ CategoryContext'
import { useRefetch } from '@/contexts/RefetchContext'
import { PeriodInfo } from '../../../types/period'
type Props = {
  type: FormType
  refreshKey: number
  periodInfo: PeriodInfo
}

export default function BudgetTab({ type, refreshKey, periodInfo }: Props) {
  const { t, language } = useLanguage()
  const { items, setItems, isLoading, error } = useBudgetItems(type, refreshKey, periodInfo)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const { incomeCategories, fixedCategories, variableCategories, addCustomCategory, removeCustomCategory, isCustomCategory } = useCategory()
  const {triggerRefetch} = useRefetch();
    // ✅ Contextから取得（カスタム含む）
  const categories =
    type === 'INCOME'   ? incomeCategories :
    type === 'FIXED'    ? fixedCategories :
                          variableCategories

  // Saved items may include custom categories that are not present in the
  // current in-memory category context yet, such as after a page reload.
  const categoryEntries = Object.entries(
    items.reduce<Record<string, string>>((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = item.category
      }
      return acc
    }, { ...categories })
  )

  useEffect(() => {
    if (type === "NONE") return
    const uniqueCategories = new Set(items.map((item) => item.category))
    uniqueCategories.forEach((category) => {
      const alreadyInSelect = Object.prototype.hasOwnProperty.call(categories, category)
      if (!alreadyInSelect && isCustomCategory(type, category)) {
        void addCustomCategory(type, category)
      }
    })
  }, [addCustomCategory, categories, isCustomCategory, items, type])

  // 削除処理
  const handleDelete = async (id: string, memo: string | null, amount: number, category: string) => {
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
      let shouldRemoveCustomCategory = false
      setItems(prev => {
        const next = prev.filter(item => item.id !== id)
        shouldRemoveCustomCategory =
          type !== "NONE" &&
          isCustomCategory(type, category) &&
          !next.some(item => item.category === category)
        return next
      })

      if (shouldRemoveCustomCategory && type !== "NONE") {
        await removeCustomCategory(type, category)
      }

      toast.success(t("household.messages.deleteSuccess"))
      triggerRefetch();
    } catch {
      toast.error(t("household.messages.deleteError"))
    }
  }

  // 日付フォーマット
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-US')

  return (
    <div className="space-y-4 mt-6">
      {isLoading && (
        <div className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
          {t("household.messages.loading")}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive">
          {error}
        </div>
      )}

      {!isLoading && !error && categoryEntries.length === 0 && (
        <div className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
          {t("household.messages.noData")}
        </div>
      )}

      {categoryEntries.map(([key, labelKey]) => {
        const categoryItems = items.filter(item => item.category === key)
        const total = categoryItems.reduce((sum, item) => sum + item.amount, 0)
        const isExpanded = expandedCategory === key

        return (
          <div key={key} className="bg-card rounded-lg border border-border shadow-sm">

            {/* ① カテゴリヘッダー行 */}
            <BudgetCategoryRow
              label={labelKey.startsWith('household.') ? t(labelKey) : labelKey}
              count={categoryItems.length}
              total={total}
              isExpanded={isExpanded}
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
