export function formatAmount(amount: string | number | null | undefined): string {
  if (amount === null || amount === undefined || amount === "") {
    return "￥0"
  }

  const raw = String(amount).trim()
  if (!raw) return "￥0"

  const sign = raw.startsWith("-") ? "-" : ""
  const unsigned = raw.replace(/^[+-]/, "")
  const [integerPartRaw, decimalPart] = unsigned.split(".")
  const normalizedInteger = integerPartRaw || "0"

  if (!/^\d+$/.test(normalizedInteger) || (decimalPart !== undefined && !/^\d+$/.test(decimalPart))) {
    const numericValue = Number(amount)
    if (!Number.isFinite(numericValue)) return "￥0"
    return `${numericValue < 0 ? "-" : ""}￥${Math.abs(numericValue).toLocaleString("ja-JP")}`
  }

  const formattedInteger = Number(normalizedInteger).toLocaleString("ja-JP")
  return `${sign}￥${formattedInteger}${decimalPart !== undefined ? `.${decimalPart}` : ""}`
}

export type budgetItem = {
  id: string
  amount: number
  category: string
  date: string
  memo: string | null
}

export type budgetTableProps = {
  items: budgetItem[]
  formatDate: (dateStr: string) => string
  onDelete: (id: string, memo: string | null, amount: number, category: string) => void
}

export type budgetCategoryProps = {
    label: string
  count: number
  total: number
  isExpanded: boolean
  onClick: () => void
}
