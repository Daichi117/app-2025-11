import { formatAmount } from "../../../utils/useBudgetMoney";
import {budgetTableProps} from "../../../utils/useBudgetMoney";
import { useLanguage } from "@/contexts/LanguageContext";
 
export default function BudgetItemTable({ items,formatDate, onDelete,}: budgetTableProps) {
  const {t} = useLanguage();

  if (items.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-4">
        {t("household.messages.noData")}
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-muted/30">
          <tr>
            <th className="text-left py-3 px-4 font-semibold text-sm">{t("household.form.date")}</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">{t("household.form.memo")}</th>
            <th className="text-right py-3 px-4 font-semibold text-sm">{t("household.form.amount")}</th>
            <th className="text-center py-3 px-4 font-semibold text-sm">{t("household.form.delete")}</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-t border-border/50 hover:bg-muted/20 transition-colors">
              <td className="py-3 px-4 text-sm">{formatDate(item.date)}</td>
              <td className="py-3 px-4 text-sm">{item.memo || '—'}</td>
              <td className="py-3 px-4 text-right font-semibold">{formatAmount(item.amount)}</td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(item.id, item.memo, item.amount)
                  }}
                  className="px-2 py-1 text-xs bg-destructive/10 text-destructive hover:bg-destructive/20 rounded transition-colors"
                >
                  {t("household.form.delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}