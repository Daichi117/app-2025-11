// contexts/CategoryContext.tsx
"use client"
import { createContext, useContext, useState } from "react"
import { INCOME_CATEGORIES,FIXED_EXPENSE_CATEGORIES,VARIABLE_EXPENSE_CATEGORIES } from "@/features/dashboard/household/types/form"

// ── ❶ 型定義 ──────────────────────────
// Contextで共有する値と関数の型を定義する
type CategoryContextType = {
  incomeCategories: Record<string, string>    // 収入カテゴリ（固定+カスタム）
  fixedCategories: Record<string, string>     // 固定費カテゴリ（固定+カスタム）
  variableCategories: Record<string, string>  // 変動費カテゴリ（固定+カスタム）
  addCustomCategory: (type: "INCOME" | "FIXED" | "VARIABLE", name: string) => void
  resetCustomCategories: (type: "INCOME" | "FIXED" | "VARIABLE") => void
  hasCustom: (type: "INCOME" | "FIXED" | "VARIABLE") => boolean
}

// ── ❷ Contextオブジェクトを作る ────────
// これが「共有の置き場」の本体
const CategoryContext = createContext<CategoryContextType | null>(null)

// ── ❸ Provider（値を提供する側） ────────
// この中にいるコンポーネントは全員Contextにアクセスできる
export function CategoryProvider({ children }: { children: React.ReactNode }) {

  // 各カテゴリをstateで管理
  // 初期値 = 既存の固定カテゴリ
  const [incomeCategories, setIncomeCategories] = useState({ ...INCOME_CATEGORIES })
  const [fixedCategories, setFixedCategories] = useState({ ...FIXED_EXPENSE_CATEGORIES })
  const [variableCategories, setVariableCategories] = useState({ ...VARIABLE_EXPENSE_CATEGORIES })

  // ── カスタムを追加する関数 ──
  // typeで「どのグループに追加するか」を判断する
  const addCustomCategory = (type: "INCOME" | "FIXED" | "VARIABLE", name: string) => {
    if (!name.trim()) return

    if (type === "INCOME") {
      // { ...prev, [name]: name } = 既存を残しつつ新しいkeyを追加
      setIncomeCategories(prev => ({ ...prev, [name]: name }))
    } else if (type === "FIXED") {
      setFixedCategories(prev => ({ ...prev, [name]: name }))
    } else {
      setVariableCategories(prev => ({ ...prev, [name]: name }))
    }
  }

  // ── カスタムをリセットする関数 ──
  // 固定カテゴリだけの状態に戻す
  const resetCustomCategories = (type: "INCOME" | "FIXED" | "VARIABLE") => {
    if (type === "INCOME") {
      setIncomeCategories({ ...INCOME_CATEGORIES })
    } else if (type === "FIXED") {
      setFixedCategories({ ...FIXED_EXPENSE_CATEGORIES })
    } else {
      setVariableCategories({ ...VARIABLE_EXPENSE_CATEGORIES })
    }
  }

  // ── カスタムが存在するか確認する関数 ──
  // 固定カテゴリのkey数と現在のkey数を比較するだけ
  const hasCustom = (type: "INCOME" | "FIXED" | "VARIABLE") => {
    if (type === "INCOME") {
      return Object.keys(incomeCategories).length > Object.keys(INCOME_CATEGORIES).length
    } else if (type === "FIXED") {
      return Object.keys(fixedCategories).length > Object.keys(FIXED_EXPENSE_CATEGORIES).length
    } else {
      return Object.keys(variableCategories).length > Object.keys(VARIABLE_EXPENSE_CATEGORIES).length
    }
  }

  return (
    <CategoryContext.Provider value={{
      incomeCategories,
      fixedCategories,
      variableCategories,
      addCustomCategory,
      resetCustomCategories,
      hasCustom,
    }}>
      {children}
    </CategoryContext.Provider>
  )
}

// ── ❹ useCategory（値を使う側のhook） ──
export const useCategory = () => {
  const ctx = useContext(CategoryContext)
  if (!ctx) throw new Error("CategoryProviderが必要です")
  return ctx
}