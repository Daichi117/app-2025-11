"use client"
import { INCOME_CATEGORIES } from "../../../types/form"
import { useLanguage } from "@/contexts/LanguageContext"
import { useBudgetForm } from "../../../hooks/useBudgetForm"
import { formatAmount } from "../../../utils/useBudgetMoney"
import { useState } from "react"
import { PlusCircle, RotateCcw } from "lucide-react"
import { AddCategoryDialog } from "./BudgetDialog"
import { useCategory } from "@/contexts/ CategoryContext"// ✅ スペース削除
import toast from "react-hot-toast"

interface BudgetIncomeFormProps {
  onSaved?: () => void
}

export default function BudgetIncomeForm({ onSaved }: BudgetIncomeFormProps) {
  const { t } = useLanguage()
  const { formData, isLoading, handleChange, handleSubmit } = useBudgetForm(
    'INCOME',
    '/api/household/income',
    onSaved
  )
  const { incomeCategories, addCustomCategory, removeCustomCategory, isCustomCategory } = useCategory()
  const [isAdding, setIsAdding] = useState(false)
  const selectedCategoryIsCustom = isCustomCategory("INCOME", formData.category)

  const inputClass = "w-full px-4 py-3 border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"

  const handleAddCategory = async (categoryName: string) => {
    const ok = await addCustomCategory("INCOME", categoryName)
    if (!ok) {
      toast.error(t("household.messages.saveError"))
      return
    }
    handleChange("category", categoryName)
    setIsAdding(false)
  }

  const handleRemoveSelectedCustom = async () => {
    if (!selectedCategoryIsCustom) return
    const ok = await removeCustomCategory("INCOME", formData.category)
    if (!ok) {
      toast.error(t("household.messages.deleteError"))
      return
    }
    handleChange("category", Object.keys(INCOME_CATEGORIES)[0])
  }

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
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium">
              {t("household.form.category")}
            </label>
            <div className="flex items-center gap-2">

              {/* 選択中カテゴリがカスタムの時だけ削除ボタン */}
              {selectedCategoryIsCustom && (
                <button
                  type="button"
                  onClick={handleRemoveSelectedCustom}
                  className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-destructive border border-destructive rounded-md hover:bg-destructive/10 transition-colors"
                >
                  <RotateCcw size={12} />
                  <span>{t("household.actions.removeSelectedCustom")}</span>
                </button>
              )}

              {/* ✅ 追加ボタン */}
              <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-secondary border border-secondary rounded-md hover:bg-secondary/10 transition-colors"
              >
                <PlusCircle size={14} />
              </button>
            </div>
          </div>

          {/* ✅ customCategoriesは不要、incomeCategories に全部入っている */}
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            disabled={isLoading}
            className={inputClass}
          >
            {Object.entries(incomeCategories).map(([key, label]) => (
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

      <AddCategoryDialog
        isOpen={isAdding}
        onClose={() => setIsAdding(false)}
        onAdd={handleAddCategory}
        type="INCOME"
      />
    </div>
  )
}
