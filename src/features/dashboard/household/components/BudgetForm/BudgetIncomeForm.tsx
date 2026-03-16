"use client"
import { INCOME_CATEGORIES } from "../../types/form"
import { useLanguage } from "@/contexts/LanguageContext"
import { useBudgetForm } from "../../hooks/useBudgetForm"
import { formatAmount } from "../../utils/useBudgetMoney"

interface BudgetIncomeFormProps {
  onSaved?: () => void  // ← 追加
}

export default function BudgetIncomeForm({ onSaved }: BudgetIncomeFormProps) {
  const { t } = useLanguage()

  const { formData, isLoading, handleChange, handleSubmit } = useBudgetForm(
    'INCOME',
    '/api/household/income',
    onSaved  // ← 追加
  )

  const inputClass = "w-full px-4 py-3 border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"

  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-secondary/20 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* 金額 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("household.form.amount")}
            <span className="text-xs ml-2 text-secondary">
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
            {Object.entries(INCOME_CATEGORIES).map(([key, label]) => (
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
            placeholder="例：給料、ボーナス、副業収入など"
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
                : 'bg-secondary text-white hover:bg-secondary/90 shadow-secondary/20'
            }`}
          >
            {isLoading ? '保存中...' : t("household.form.save")}
          </button>
        </div>
      </form>
    </div>
  )
}