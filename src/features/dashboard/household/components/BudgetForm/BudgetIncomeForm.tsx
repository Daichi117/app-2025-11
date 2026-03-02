"use client"
import { INCOME_CATEGORIES } from "../../types/form"
import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
export default function BudgetIncomeForm() {
    
    const {t} = useLanguage();
    const inputClass = "w-full px-4 py-3 border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all";
  return (
  
      <div className="bg-white p-6 rounded-2xl border-2 border-secondary/20 shadow-sm">
      <form className="space-y-4">

        <div>
        <label className="block text-sm font-medium mb-1">  
            {t("household.form.amount")}
        </label>
            <input type="number" className={inputClass} placeholder="0" />
      
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">
                {t("household.form.category")}
            </label>
            <select className={inputClass}>
            {Object.entries(INCOME_CATEGORIES).map(([key, label]) => (
              <option key={key} value={key}>{t(label)}</option>
            ))}
          </select>
            
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t("household.form.date")}
          </label>
          <input type="date" className={inputClass} defaultValue={new Date().toISOString().split('T')[0]} />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">
                {t("household.form.memo")}
            </label>
            <input type="text" className={inputClass} placeholder="例：給料、ボーナス、副業収入など" />
        </div>

                <div className="flex justify-end mt-6">
        <button className="px-10 py-4 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 shadow-lg shadow-secondary/20 transition-all">
            {t("household.form.save")}
        </button>
        </div>
      </form>
      </div>
  )
}
