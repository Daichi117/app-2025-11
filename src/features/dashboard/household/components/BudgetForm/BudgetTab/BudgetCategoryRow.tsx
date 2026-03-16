// components/BudgetCategoryRow.tsx
import { formatAmount, budgetCategoryProps } from "../../../utils/useBudgetMoney"

export default function BudgetCategoryRow({
  label,
  count,
  total,
  isExpanded,
  formatCount,
  onClick,
}: budgetCategoryProps) {  // ← 戻り値ではなくPropsの型
  return (
    <div
      className="p-5 flex justify-between items-center cursor-pointer hover:bg-muted/30 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <span className="font-medium text-lg">{label}</span>
        <span className="text-sm text-muted-foreground">
          （{formatCount(count)}）
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold">
          {formatAmount(total)}
        </span>
        <span className="text-sm text-muted-foreground">
          {isExpanded ? '▲' : '▼'}
        </span>
      </div>
    </div>
  )
}