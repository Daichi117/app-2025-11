import React from 'react'
import { useState } from 'react'
import BudgetTitle from './BudgetTitle';
import BudgetIncomeForm from './BudgetIncomeForm';
import BudgetExpenseForm from './BudgetExpenseForm';
import { FormType } from '../../types/form';
import { useLanguage } from '@/contexts/LanguageContext';
export default function BudgetContents() {
    const {t} = useLanguage()
    const [activeForm, setActiveForm] = useState<FormType>("NONE")
  return (
    <div>
      {/* BudgetTitle and forms: same width as dashboard header (max-w-7xl mx-auto px-6) */}
      <BudgetTitle
        activeForm={activeForm}
        onFormChange={(form) => setActiveForm(form)}
      />
       {/* ── activeFormの値によって表示を切り替える ── */}
       <div className="transition-all duration-300">
        {activeForm === "INCOME" && <BudgetIncomeForm />}
        {activeForm === "FIXED"  && <BudgetExpenseForm type="FIXED" />}
        {activeForm === "VARIABLE" && <BudgetExpenseForm type="VARIABLE" />}
        {activeForm === "NONE" && (
          <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl text-gray-400">
            <p className="text-lg font-medium">
              {t("household.messages.invalidForm")}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
