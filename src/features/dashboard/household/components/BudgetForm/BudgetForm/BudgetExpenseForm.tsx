"use client"
import { useLanguage } from "@/contexts/LanguageContext"
import { useBudgetForm } from "../../../hooks/useBudgetForm"
import { formatAmount } from "../../../utils/useBudgetMoney"
import { useState } from "react"
import { PlusCircle, RotateCcw } from "lucide-react"
import { AddCategoryDialog } from "./BudgetDialog"
import { useCategory } from "@/contexts/ CategoryContext" // ✅ スペース削除
import { FIXED_EXPENSE_CATEGORIES, VARIABLE_EXPENSE_CATEGORIES } from "../../../types/form"
import toast from "react-hot-toast"

interface BudgetExpenseFormProps {
  type: 'FIXED' | 'VARIABLE'
  onSaved?: () => void
}

export default function BudgetExpenseForm({ type, onSaved }: BudgetExpenseFormProps) {
  const { t } = useLanguage()

  // ✅ expense用のカテゴリを取得
  const { fixedCategories, variableCategories, addCustomCategory, removeCustomCategory, isCustomCategory } = useCategory()

  const [isAdding, setIsAdding] = useState(false)

  // ✅ Contextから取得（カスタム含む）
  const categories = type === 'FIXED' ? fixedCategories : variableCategories

  const { formData, isLoading, handleChange, handleSubmit } = useBudgetForm(
    type,
    '/api/household/expense',
    onSaved
  )

  const inputClass = "w-full px-4 py-3 border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-destructive focus:border-destructive transition-all"

  // ✅ type をそのまま渡す
  const selectedCategoryIsCustom = isCustomCategory(type, formData.category)

  const handleAddCategory = async (categoryName: string) => {
    const ok = await addCustomCategory(type, categoryName)
    if (!ok) {
      toast.error(t("household.messages.saveError"))
      return
    }
    handleChange('category', categoryName)
    setIsAdding(false)
  }

  const handleRemoveSelectedCustom = async () => {
    if (!selectedCategoryIsCustom) return
    const selectedCategory = formData.category
    const ok = await removeCustomCategory(type, selectedCategory)
    if (!ok) {
      toast.error(t("household.messages.deleteError"))
      return
    }

    const fallbackCategory =
      type === "FIXED"
        ? Object.keys(FIXED_EXPENSE_CATEGORIES)[0]
        : Object.keys(VARIABLE_EXPENSE_CATEGORIES)[0]
    handleChange("category", fallbackCategory)
  }

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

              {/* 追加ボタン */}
              <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-destructive border border-destructive rounded-md hover:bg-destructive/10 transition-colors"
              >
                <PlusCircle size={14} />
              </button>
            </div>
          </div>

          {/* ✅ Contextのcategoriesを参照 */}
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

      <AddCategoryDialog
        isOpen={isAdding}
        onClose={() => setIsAdding(false)}
        onAdd={handleAddCategory}
        type={type}
      />
    </div>
  )
}
