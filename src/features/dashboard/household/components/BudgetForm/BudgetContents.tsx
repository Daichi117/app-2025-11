"use client"
import { useState } from 'react'
import BudgetTitle from './BudgetTitle'
import BudgetIncomeForm from './BudgetForm/BudgetIncomeForm'
import BudgetExpenseForm from './BudgetForm/BudgetExpenseForm'
import BudgetTab from './BudgetTab/BudgetTab'
import { FormType } from '../../types/form'
import { useLanguage } from '@/contexts/LanguageContext'

export default function BudgetContents() {
  const { t } = useLanguage()
  const [activeForm, setActiveForm] = useState<FormType>("NONE")
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSaved = () => setRefreshKey(k => k + 1)

  return (
    <div className="space-y-4">
      <BudgetTitle
        activeForm={activeForm}
        onFormChange={(form) => setActiveForm(form)}
      />

      <div className="transition-all duration-300">
        {activeForm === "INCOME" && (
          <BudgetIncomeForm onSaved={handleSaved} />
        )}
        {activeForm === "FIXED" && (
          <BudgetExpenseForm type="FIXED" onSaved={handleSaved} />
        )}
        {activeForm === "VARIABLE" && (
          <BudgetExpenseForm type="VARIABLE" onSaved={handleSaved} />
        )}
        {activeForm === "NONE" && (
          <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl text-gray-400">
            <p className="text-lg font-medium">
              {t("household.messages.invalidForm")}
            </p>
          </div>
        )}
      </div>

      {/* フォームが選択されていればタブを表示 */}
      {activeForm !== "NONE" && (
        <BudgetTab type={activeForm} refreshKey={refreshKey} />
      )}
    </div>
  )
}