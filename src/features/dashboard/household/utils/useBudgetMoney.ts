export function formatAmount(amount: any): string {
  if (amount >= 10_000) return `${(amount / 10_000).toFixed(1)}万円`
  return `${amount.toLocaleString()}円`
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
  onDelete: (id: string, memo: string | null, amount: number) => void
}

export type budgetCategoryProps = {
    label: string
  count: number
  total: number
  isExpanded: boolean
  formatCount: (count: number) => string
  onClick: () => void
}