"use client";

import { FormType } from "../../types/form";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormSelectorProps {
  activeForm: FormType;
  onFormChange: (form: FormType) => void;
}

export default function BudgetTitle({activeForm, onFormChange}: FormSelectorProps) {
  const {t} = useLanguage();

  // 判定ロジック（ここがデザインの「スイッチ」になります）
  const isIncome = activeForm === 'INCOME';
  const isFixed = activeForm === 'FIXED';
  const isVariable = activeForm === 'VARIABLE';
  const isExpenseActive = isFixed || isVariable;

  // 共通の土台デザイン（ここを変えると全てのボタンが変わります）
  const baseBtn = "px-6 py-2 font-medium rounded-lg transition-all duration-200 shadow-sm border-2 text-sm";

  return (
    <div className="mb-8">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">{t("household.form.title")}</h2>
        </div>

        <div className="flex gap-3">
          {/* --- 収入ボタン --- */}
          <button 
            onClick={() => onFormChange('INCOME')}
            className={`${baseBtn} ${
              isIncome 
                ? 'bg-secondary border-secondary text-white shadow-md scale-105' 
                : 'bg-white border-muted text-muted-foreground hover:border-secondary/50'
            }`}
          >
            💰 {t("household.summary.income")}
          </button>

          {/* --- 支出ボタン（ドロップダウン） --- */}
          <div className="relative group">
            <button 
              className={`${baseBtn} ${
                isExpenseActive
                  ? 'bg-destructive border-destructive text-white shadow-md scale-105' 
                  : 'bg-white border-muted text-muted-foreground group-hover:border-destructive/50'
              }`}
            >
              💸 {t("household.summary.expense")}
            </button>
            
            {/* ドロップダウンメニュー */}
            {/* invisible group-hover:visible がホバーで出す魔法です */}
            <div className="absolute top-full w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30">
              <div className="bg-white border border-muted rounded-lg shadow-xl overflow-hidden p-1">
                
                <button 
                  onClick={() => onFormChange('FIXED')}
                  className="w-full px-2 py-2 text-left text-sm rounded-md flex items-center">
                  <div className="w-1 h-1 rounded-full"/>
                  {t("household.summary.fixedExpense")}
                </button>

                <button 
                  onClick={() => onFormChange('VARIABLE')}
                  className="w-full px-2 py-2 text-left text-sm rounded-md flex items-center"
                >
                  <div className="w-1 h-3 rounded-full"/>
                  {t("household.summary.variableExpense")}
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}