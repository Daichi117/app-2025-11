"use client";

import { FIXED_EXPENSE_CATEGORIES,VARIABLE_EXPENSE_CATEGORIES } from "../../types/form";
import { useLanguage } from "@/contexts/LanguageContext";

interface BudgetExpenseFormProps {
  type: 'FIXED' | 'VARIABLE';
}

export default function BudgetExpenseForm({ type }: BudgetExpenseFormProps) {
  const { t } = useLanguage();
  
  // 1. タイプによって使うカテゴリ定数を切り替える
  // 固定費なら FIXED_EXPENSE_CATEGORIES、変動費なら CATEGORY_TYPES（先ほど定義したもの）
  const categories = type === 'FIXED' ? FIXED_EXPENSE_CATEGORIES : VARIABLE_EXPENSE_CATEGORIES;

  // 2. 共通のスタイル（支出なので focus 時の色を destructive に設定）
  const inputClass = "w-full px-4 py-3 border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-destructive focus:border-destructive transition-all";

  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-destructive/20 shadow-sm animate-in fade-in slide-in-from-bottom-4">
      <form className="space-y-4">
        {/* 金額 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("household.form.amount")}
          </label>
          <div className="relative">
            <input type="number" className={inputClass} placeholder="0" />
          </div>
        </div>

        {/* カテゴリ（動的に切り替わる） */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("household.form.category")}
          </label>
          <select className={inputClass}>
            {Object.entries(categories).map(([key, label]) => (
              <option key={key} value={key}>
                {t(label)}
              </option>
            ))}
          </select>
        </div>

        {/* 日付（支出にはいつ払ったかの記録が重要です） */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("household.form.date")}
          </label>
          <input type="date" className={inputClass} defaultValue={new Date().toISOString().split('T')[0]} />
        </div>

        {/* メモ */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("household.form.memo")}
          </label>
          <input 
            type="text" 
            className={inputClass} 
            placeholder={type === 'FIXED' ? "例：1月分家賃" : "例：スーパーでの買い物"} 
          />
        </div>
        <div className="flex justify-end mt-6">
            <button className="px-10 py-4 bg-destructive text-white font-bold rounded-xl hover:bg-destructive/90 shadow-lg shadow-destructive/20 transition-all">
                {t("household.form.save")}
            </button>
        </div>
      </form>
    </div>
  );
}