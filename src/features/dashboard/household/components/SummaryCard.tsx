"use client";
import { useLanguage } from "@/contexts/LanguageContext";


export default function SummaryCard() {
    const {t} = useLanguage();
// 1. データの「定義」と「表示ルール」をここで完成させる
const summaryItems = [
    {
      id: "income",
      title: "household.summary.income", // 本来は i18n.summary.income
      amount: 540000,

      colorClass: "text-secondary", // 収入の色
    },
    {
      id: "expense",
      title: "household.summary.expense", // 本来は i18n.summary.expense
      amount: 340000,
      colorClass: "text-destructive", // 支出の色
    },
    {
      id: "surplus",
      title: "household.summary.surplus", // 本来は i18n.summary.surplus
      amount: 200000,
      colorClass: 200000 >= 0 ? "text-primary" : "text-destructive", // プラスなら青、マイナスなら赤
    },
  ];
  return (
    <div className="mb-8 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 md:p-8">
       <h2 className="mb-4 flex items-center gap-2">
            <span>📊</span>
            <span>{t("household.summary.total")}</span>
       </h2>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {summaryItems.map((item)=> {
            return (
                <div key={item.id} className="bg-white rounded-lg p-6 border shadow-sm">
                    <div className="text-sm text-muted-foreground mb-2">
                    {t(item.title)}
                </div>
                <div className={`text-2xl md:text-3xl font-bold mb-1 number ${item.colorClass}`}>
                ¥{item.amount.toLocaleString()}
              </div>
            </div>
            )
        })}
       </div>
    </div>
  )
}
