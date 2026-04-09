# 学習ガイド（実践重視）

このガイドは、FE中心の知識から始めて、今のプロジェクトを使って `API` / `DB` / `hooks` / `context` を実践で理解するための進め方です。

## 目的

- AI に実装してもらったコードを、あとで自分でレビューできる状態にする
- 1機能ごとに「画面 → API → DB」の流れを言語化できるようにする
- React の依存関係（`useEffect` / `useCallback`）の事故を減らす

## 先に覚える順番（この順で十分）

1. `state` / `props` / `useEffect` の基本
2. `custom hook` の役割（状態管理と再利用）
3. `context`（画面間で共有する状態）
4. Next.js の `page` と `app/api/**/route.ts`
5. Prisma スキーマとテーブルの関係

## 1日 90 分の実践ループ

1. 30分: 1機能の流れを追う  
   対象例（家計簿）:
   - [src/app/dashboard/household/page.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/app/dashboard/household/page.tsx)
   - [src/features/dashboard/household/hooks/useBudgetForm.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/hooks/useBudgetForm.ts)
   - [src/app/api/household/income/route.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/app/api/household/income/route.ts)
   - [prisma/schema.prisma](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/prisma/schema.prisma)

2. 30分: 小さな変更を1つ入れる  
   例:
   - エラーメッセージ文言を改善
   - バリデーションを1つ追加
   - ローディング表示のちらつきを抑える

3. 30分: 変更を記録する  
   - [docs/FEATURE_NOTE_TEMPLATE.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/FEATURE_NOTE_TEMPLATE.ja.md) をコピーして1件記録

## 週ごとの学習テーマ（4週間）

1. 週1: React依存関係に集中  
   `useEffect` の依存配列、`useCallback` の依存配列、再レンダーの原因を説明できる状態にする。

2. 週2: APIに集中  
   1画面につき `GET/POST/DELETE` を追い、成功・失敗・401時の挙動を説明できる状態にする。

3. 週3: DBに集中  
   Prisma スキーマの1モデルを選び、どの API が書き込み、どの画面が読み取りかを整理する。

4. 週4: 統合レビュー  
   1機能を「UI、hook、API、DB、エラー処理、UX」の観点でレビューする。

## Codex を使うときの運用ルール（おすすめ）

1. 実装依頼の前に「対象ファイルと目的」を固定する  
   例: 「`household` のカスタムカテゴリだけ、表示不整合を修正」

2. 実装後に必ずこれを依頼する  
   - 何を変更したか（3行）
   - 依存関係への影響
   - 手動テスト観点 3つ

3. 変更ごとに 1 つだけ「自分で修正」を入れる  
   AI 実装 + 自分の小修正を毎回セットにすると定着が速いです。

## ゴール判定

次の4つを口頭で説明できたら、かなり前進しています。

- この画面の入力は、どの hook が受けるか
- どの API が DB に保存するか
- 失敗時に UI がどうなるか
- この変更で壊れやすい依存関係はどこか
