"use client"
import { useLanguage } from "@/contexts/LanguageContext"
import { useBudgetForm } from "../../hooks/useBudgetForm"
import { FIXED_EXPENSE_CATEGORIES, VARIABLE_EXPENSE_CATEGORIES } from "../../types/form"
import { formatAmount } from "../../utils/useBudgetMoney"

interface BudgetExpenseFormProps {
  type: 'FIXED' | 'VARIABLE'
  onSaved?: () => void  // ← 追加
}

export default function BudgetExpenseForm({ type, onSaved }: BudgetExpenseFormProps) {
  const { t } = useLanguage()

  const categories = type === 'FIXED' ? FIXED_EXPENSE_CATEGORIES : VARIABLE_EXPENSE_CATEGORIES

  const { formData, isLoading, handleChange, handleSubmit } = useBudgetForm(
    type,
    '/api/household/expense',
    onSaved  // ← 追加
  )

  const inputClass = "w-full px-4 py-3 border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-destructive focus:border-destructive transition-all"

  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-destructive/20 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* 金額 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("household.form.amount")}
            <span className="text-xs ml-2 text-destructive">
              ({formatAmount(formData.amount)})
            </span>
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            disabled={isLoading}
            className={inputClass}
            placeholder="0"
          />
        </div>

        {/* カテゴリ */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("household.form.category")}
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            disabled={isLoading}
            className={inputClass}
          >
            {Object.entries(categories).map(([key, label]) => (
              <option key={key} value={key}>{t(label)}</option>
            ))}
          </select>
        </div>

        {/* 日付 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("household.form.date")}
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            disabled={isLoading}
            className={inputClass}
          />
        </div>

        {/* メモ */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("household.form.memo")}
          </label>
          <input
            type="text"
            value={formData.memo}
            onChange={(e) => handleChange('memo', e.target.value)}
            disabled={isLoading}
            className={inputClass}
            placeholder={type === 'FIXED' ? "例：1月分家賃" : "例：スーパーでの買い物"}
          />
        </div>

        {/* 保存ボタン */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-10 py-4 font-bold rounded-xl shadow-lg transition-all ${
              isLoading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-destructive text-white hover:bg-destructive/90 shadow-destructive/20'
            }`}
          >
            {isLoading ? '保存中...' : t("household.form.save")}
          </button>
        </div>
      </form>
    </div>
  )
}