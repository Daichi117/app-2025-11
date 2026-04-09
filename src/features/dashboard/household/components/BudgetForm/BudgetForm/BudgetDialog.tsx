"use client"
import { useState } from "react"
import { createPortal } from "react-dom"
import { useLanguage } from "@/contexts/LanguageContext"

type Props = {
  isOpen: boolean
  onClose: () => void
  onAdd: (categoryName: string) => Promise<void> | void
  type?: "INCOME" | "FIXED" | "VARIABLE"  // ✅ 追加
}

export function AddCategoryDialog({ isOpen, onClose, onAdd, type }: Props) {
  const [value, setValue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useLanguage()

  if (!isOpen) return null

  // ✅ FIXED or VARIABLE なら destructive、それ以外は secondary
  const isExpense = type === "FIXED" || type === "VARIABLE"
  const colorClass = isExpense
    ? "bg-destructive text-white"
    : "bg-secondary text-white"

  const handleAdd = async () => {
    if (!value.trim()) return
    setIsSubmitting(true)
    try {
      await onAdd(value.trim())
      setValue("")
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-sm"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold mb-4">
          {t("household.actions.addCategory")}
        </h3>

        <input
          type="text"  // ✅ "category" → "text" に修正
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleAdd()}
          placeholder="カテゴリ名を入力"
          autoFocus
          className="w-full px-4 py-3 border-2 rounded-lg mb-4"
        />

        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onClose}>
            {t("household.actions.cancel")}
          </button>
          {/* ✅ typeに応じて色が変わる */}
          <button
            type="button"
            onClick={handleAdd}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-lg ${colorClass}`}
          >
            {t("household.actions.add")}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
