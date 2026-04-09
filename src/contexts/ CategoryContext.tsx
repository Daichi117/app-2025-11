// contexts/CategoryContext.tsx
"use client"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { INCOME_CATEGORIES,FIXED_EXPENSE_CATEGORIES,VARIABLE_EXPENSE_CATEGORIES } from "@/features/dashboard/household/types/form"

type CategoryType = "INCOME" | "FIXED" | "VARIABLE"
type CategoryRecord = Record<string, string>
type CustomCategoryState = Record<CategoryType, CategoryRecord>

// 「固定カテゴリ（コード定義）」と「ユーザー追加カテゴリ（DB由来）」を分けて管理する。
const BASE_CATEGORIES: Record<CategoryType, CategoryRecord> = {
  INCOME: { ...INCOME_CATEGORIES },
  FIXED: { ...FIXED_EXPENSE_CATEGORIES },
  VARIABLE: { ...VARIABLE_EXPENSE_CATEGORIES },
}

type CategoryContextType = {
  incomeCategories: CategoryRecord
  fixedCategories: CategoryRecord
  variableCategories: CategoryRecord
  addCustomCategory: (type: CategoryType, name: string) => Promise<boolean>
  removeCustomCategory: (type: CategoryType, name: string) => Promise<boolean>
  resetCustomCategories: (type: CategoryType) => Promise<boolean>
  hasCustom: (type: CategoryType) => boolean
  isCustomCategory: (type: CategoryType, name: string) => boolean
  isLoading: boolean
}

const CategoryContext = createContext<CategoryContextType | null>(null)

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  // customCategories は DB同期対象。base は不変なので state に持たない。
  const [customCategories, setCustomCategories] = useState<CustomCategoryState>({
    INCOME: {},
    FIXED: {},
    VARIABLE: {},
  })
  const [isLoading, setIsLoading] = useState(true)

  const incomeCategories = useMemo(
    () => ({ ...BASE_CATEGORIES.INCOME, ...customCategories.INCOME }),
    [customCategories.INCOME]
  )
  const fixedCategories = useMemo(
    () => ({ ...BASE_CATEGORIES.FIXED, ...customCategories.FIXED }),
    [customCategories.FIXED]
  )
  const variableCategories = useMemo(
    () => ({ ...BASE_CATEGORIES.VARIABLE, ...customCategories.VARIABLE }),
    [customCategories.VARIABLE]
  )

  // 初回のみ DB からカスタムカテゴリを取得して、select の選択肢を復元する。
  useEffect(() => {
    let cancelled = false
    async function loadCustomCategories() {
      try {
        const res = await fetch("/api/household/categories", {
          credentials: "include",
        })
        if (!res.ok) {
          return
        }
        const data = await res.json()
        const rows = Array.isArray(data?.customCategories) ? data.customCategories : []
        const next: CustomCategoryState = { INCOME: {}, FIXED: {}, VARIABLE: {} }

        rows.forEach((item: { type?: string; name?: string }) => {
          if (!item?.name || typeof item.name !== "string") return
          if (item.type === "INCOME" || item.type === "FIXED" || item.type === "VARIABLE") {
            next[item.type][item.name] = item.name
          }
        })

        if (!cancelled) {
          setCustomCategories(next)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }
    loadCustomCategories()
    return () => {
      cancelled = true
    }
  }, [])

  // default はコード定義カテゴリ。APIから消さないため判定を共通化する。
  const isDefaultCategory = useCallback((type: CategoryType, name: string) => {
    return Object.prototype.hasOwnProperty.call(BASE_CATEGORIES[type], name)
  }, [])

  // 追加は API 成功後に state 反映する。失敗時に UI だけ進まないようにする設計。
  const addCustomCategory = useCallback(async (type: CategoryType, name: string) => {
    const normalizedName = name.trim()
    if (!normalizedName) return false
    if (isDefaultCategory(type, normalizedName)) return true

    try {
      const res = await fetch("/api/household/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          type,
          name: normalizedName,
        }),
      })

      if (!res.ok) return false

      setCustomCategories((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          [normalizedName]: normalizedName,
        },
      }))
      return true
    } catch {
      return false
    }
  }, [isDefaultCategory])

  // 削除対象が default の場合は早期 return。誤削除防止のガード。
  const removeCustomCategory = useCallback(async (type: CategoryType, name: string) => {
    const normalizedName = name.trim()
    if (!normalizedName) return false
    if (isDefaultCategory(type, normalizedName)) return false

    try {
      const res = await fetch("/api/household/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          type,
          name: normalizedName,
        }),
      })
      if (!res.ok) return false

      setCustomCategories((prev) => {
        const next = { ...prev[type] }
        delete next[normalizedName]
        return {
          ...prev,
          [type]: next,
        }
      })
      return true
    } catch {
      return false
    }
  }, [isDefaultCategory])

  // type 単位のリセット。INCOME/FIXED/VARIABLE の境界を保って消す。
  const resetCustomCategories = useCallback(async (type: CategoryType) => {
    try {
      const res = await fetch("/api/household/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type }),
      })
      if (!res.ok) return false

      setCustomCategories((prev) => ({
        ...prev,
        [type]: {},
      }))
      return true
    } catch {
      return false
    }
  }, [])

  // UI 側では「default 以外」を custom と見なす。
  const hasCustom = useCallback((type: CategoryType) => {
    return Object.keys(customCategories[type]).length > 0
  }, [customCategories])

  const isCustomCategory = useCallback((type: CategoryType, name: string) => {
    return !isDefaultCategory(type, name)
  }, [isDefaultCategory])

  return (
    <CategoryContext.Provider value={{
      incomeCategories,
      fixedCategories,
      variableCategories,
      addCustomCategory,
      removeCustomCategory,
      resetCustomCategories,
      hasCustom,
      isCustomCategory,
      isLoading,
    }}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategory = () => {
  const ctx = useContext(CategoryContext)
  if (!ctx) throw new Error("CategoryProviderが必要です")
  return ctx
}
