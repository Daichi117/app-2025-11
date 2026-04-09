import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAsyncState } from "@/components/household/hooks/useAsyncState"
import { FormType } from "../types/form"
import { useRefetch } from "@/contexts/RefetchContext"
import toast from "react-hot-toast"

type FormData = {
  // 入力中は空文字や途中入力を扱うため number ではなく string で保持する。
  amount: string
  category: string
  date: string
  memo: string
}

function validateForm(formData: FormData, t: (key: string) => string): string | null {
  // FE で先に弾くことで、API往復前にユーザーへ即時フィードバックする。
  if (!formData.amount || !formData.amount.trim()) return t("household.messages.invalidAmount")
  const numAmount = Number(formData.amount)
  if (isNaN(numAmount) || numAmount <= 0) return t("household.messages.zeroAmount")
  // if (!formData.category || !formData.category.trim()) return t("household.messages.invalidCategory")
  if (!formData.date) return t("household.messages.invalidDate")
  return null
}

export function useBudgetForm(
  type: FormType,
  endpoint: string,
  onSuccess?: () => void  // ← 追加
) {
  const router = useRouter()
  const { t } = useLanguage()
  const {triggerRefetch} = useRefetch();
  const { isLoading, execute } = useAsyncState({
    // execute は loading/success toast の共通ハンドラ。
    successMessage: t("household.messages.saveSuccess"),
    loadingMessage: t("household.messages.saving"),
  })

  const defaultCategory =
    type === "INCOME"   ? "SALARY" :
    type === "FIXED"    ? "RENT"   :
    type === "VARIABLE" ? "FOOD"   : ""

  const [formData, setFormData] = useState<FormData>({
    amount: "",
    category: defaultCategory,
    date: new Date().toISOString().split('T')[0],
    memo: ""
  })

  const handleChange = useCallback((field: string, value: string) => {
    // フィールド単位更新で、フォームの変更責務を hook に集約する。
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const vError = validateForm(formData, t)
    if (vError) {
      toast.error(vError)
      return
    }

    await execute(async () => {
      // API 契約に合わせて送信時に string -> number へ変換する。
      const payload: {
        amount: number
        category: string
        date: string
        memo?: string
        type?: "FIXED" | "VARIABLE"
      } = {
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date,
        memo: formData.memo || undefined,
      }

      if (type === 'FIXED' || type === 'VARIABLE') {
        payload.type = type
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      })

      const text = await response.text()
      // 空ボディ対策。JSON前提で parse して落ちる事故を防ぐ。
      const data = text ? JSON.parse(text) : {}

      if (!response.ok) {
        throw new Error(data.message || '保存に失敗しました')
      }

      triggerRefetch()
      // 保存後は UX とデータ整合のため、初期カテゴリに戻して入力状態をリセット。
      setFormData({
        amount: "",
        category: defaultCategory,  // ← デフォルトに戻す
        date: new Date().toISOString().split('T')[0],
        memo: ""
      })

      onSuccess?.()   // ← 追加
      router.refresh()
    })
  }, [defaultCategory, endpoint, execute, formData, onSuccess, router, t, triggerRefetch, type])

  return { formData, isLoading, handleChange, handleSubmit }
}
