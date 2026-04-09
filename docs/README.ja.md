# ドキュメント入口

このファイルは、`docs` の入口です。  
迷ったらここから読んでください。

## まず読む順番

1. プロジェクト概要  
- [README.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/README.md)

2. 設計と全体像  
- [ARCHITECTURE.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/ARCHITECTURE.ja.md)

3. 変更履歴  
- [CHANGELOG.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/CHANGELOG.ja.md)

4. 学習とレビュー運用  
- [STUDY_GUIDE.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/STUDY_GUIDE.ja.md)  
- [REVIEW_CHECKLIST.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/REVIEW_CHECKLIST.ja.md)  
- [FEATURE_NOTE_TEMPLATE.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/FEATURE_NOTE_TEMPLATE.ja.md)

## 今の実装を最短で追うルート（家計簿）

1. 画面入口  
- [src/app/dashboard/household/page.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/app/dashboard/household/page.tsx)

2. 入力フォーム  
- [src/features/dashboard/household/components/BudgetForm/BudgetForm/BudgetIncomeForm.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/components/BudgetForm/BudgetForm/BudgetIncomeForm.tsx)  
- [src/features/dashboard/household/components/BudgetForm/BudgetForm/BudgetExpenseForm.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/components/BudgetForm/BudgetForm/BudgetExpenseForm.tsx)

3. クライアント状態  
- [src/features/dashboard/household/hooks/useBudgetForm.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/hooks/useBudgetForm.ts)  
- [src/features/dashboard/household/hooks/useBudgetItems.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/hooks/useBudgetItems.ts)  
- [src/contexts/ CategoryContext.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/contexts/%20CategoryContext.tsx)

4. API と DB  
- [src/app/api/household/income/route.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/app/api/household/income/route.ts)  
- [src/app/api/household/expense/route.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/app/api/household/expense/route.ts)  
- [src/app/api/household/categories/route.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/app/api/household/categories/route.ts)  
- [prisma/schema.prisma](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/prisma/schema.prisma)

## 運用ルール

- 仕様や責務が変わったら [ARCHITECTURE.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/ARCHITECTURE.ja.md) を更新
- 実装変更の履歴は [CHANGELOG.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/CHANGELOG.ja.md) に追記
- 学習手順やレビュー観点は  
[STUDY_GUIDE.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/STUDY_GUIDE.ja.md) / [REVIEW_CHECKLIST.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/REVIEW_CHECKLIST.ja.md) を更新
- 機能理解ノートは [FEATURE_NOTE_TEMPLATE.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/FEATURE_NOTE_TEMPLATE.ja.md) を複製して `docs/notes/` に保存
