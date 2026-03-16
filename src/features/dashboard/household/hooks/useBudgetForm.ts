import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAsyncState } from "@/components/household/hooks/useAsyncState"
import { FormType } from "../types/form"
import toast from "react-hot-toast"

type FormData = {
  amount: string
  category: string
  date: string
  memo: string
}

function validateForm(formData: FormData, t: (key: string) => string): string | null {
  if (!formData.amount || !formData.amount.trim()) return t("household.messages.invalidAmount")
  const numAmount = Number(formData.amount)
  if (isNaN(numAmount) || numAmount <= 0) return t("household.messages.zeroAmount")
  if (!formData.category) return t("household.messages.invalidCategory")
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

  const { isLoading, execute } = useAsyncState({
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
      const payload: any = {
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
      const data = text ? JSON.parse(text) : {}

      // if (!response.ok) {
      //   throw new Error(data.message || '保存に失敗しました')
      // }

      setFormData({
        amount: "",
        category: defaultCategory,  // ← デフォルトに戻す
        date: new Date().toISOString().split('T')[0],
        memo: ""
      })

      onSuccess?.()   // ← 追加
      router.refresh()
    })
  }, [formData, t, endpoint, type, router, execute, onSuccess])

  return { formData, isLoading, handleChange, handleSubmit }
}