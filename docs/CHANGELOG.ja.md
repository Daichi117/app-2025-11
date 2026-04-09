# 変更履歴

このファイルは、実装変更の履歴を一元管理するための変更ログです。
設計変更の意図は `ARCHITECTURE.ja.md`、ドキュメントの入口は `docs/README.ja.md`、実際に何を変えたかはこのファイルに残します。

## 記録ルール

- 新しい変更は先頭に追記する
- 1 変更につき、日付、対象、変更内容、理由、関連ファイルを書く
- 不具合修正は「現象」と「原因」が分かるように書く
- 仕様変更は「変更前」と「変更後」が分かるように書く

---

## 2026-04-09

### ドキュメント: 入口の重複説明を整理し、最新仕様に更新

- 対象: `README.md` / `docs/README.ja.md` / `docs/ARCHITECTURE.ja.md`
- 変更内容:
  - `docs/README.ja.md` を「入口専用」に整理し、重複していた不具合の長文解説を削減
  - `README.md` のカスタムカテゴリ説明を、DB永続化済みの仕様に更新
  - `ARCHITECTURE.ja.md` の `CategoryProvider` 説明と改善項目を、現行の DB 同期仕様に更新
- 理由:
  - ドキュメント肥大化と重複を減らし、読む順番と責務分担を明確にするため
- 関連ファイル:
  - [README.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/README.md)
  - [docs/README.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/README.ja.md)
  - [docs/ARCHITECTURE.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/ARCHITECTURE.ja.md)

### ドキュメント: 実践学習とレビュー運用を追加

- 対象: `docs` 運用
- 変更内容:
  - 実践ベース学習のためのガイドを追加
  - 機能理解ノートのテンプレートを追加
  - FE向けレビュー観点チェックリストを追加
  - ドキュメント入口から上記3ファイルへ辿れるよう導線を追加
- 理由:
  - FE中心の知識からでも、実装を通じて API / DB / hooks / context を段階的に理解できる運用にするため
- 関連ファイル:
  - [docs/STUDY_GUIDE.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/STUDY_GUIDE.ja.md)
  - [docs/FEATURE_NOTE_TEMPLATE.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/FEATURE_NOTE_TEMPLATE.ja.md)
  - [docs/REVIEW_CHECKLIST.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/REVIEW_CHECKLIST.ja.md)
  - [docs/README.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/README.ja.md)

## 2026-04-04

### ホーム: 家計簿とシミュレーションをつなぐダッシュボードを追加

- 対象: `/dashboard`
- 変更内容:
  - ホームを単なるリダイレクトではなく、目標差額、今月の家計、原因分析、改善提案、クイック導線を持つダッシュボードに変更
  - シミュレーションの最新条件を localStorage に保存し、ホームで目標サマリーに再利用するように変更
  - 今月、先月、過去3か月平均の家計データを比較し、固定費、変動費、収入のどこが主因かを判定するロジックを追加
- 理由:
  - fintech の家計簿 × 投資アプリとして、目標まで「いくら足りないか」「なぜ足りないか」「何をすればいいか」をホームで一目で分かるようにするため
- 関連ファイル:
  - [src/app/dashboard/page.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/app/dashboard/page.tsx)
  - [src/features/dashboard/home/components/HomeDashboard.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/home/components/HomeDashboard.tsx)
  - [src/features/dashboard/home/hooks/useHomeDashboard.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/home/hooks/useHomeDashboard.ts)
  - [src/features/dashboard/home/i18n/ja.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/home/i18n/ja.ts)
  - [src/features/dashboard/home/i18n/en.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/home/i18n/en.ts)
  - [src/features/dashboard/simulation/utils/storage.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/simulation/utils/storage.ts)

### シミュレーション: 初期版 UI と計算ロジックを追加

- 対象: `/dashboard/simulation`
- 変更内容:
  - 目標から逆算するモードと、積立見込みを確認するモードを実装
  - 希望資産額、現在資産額、積立額、運用年数、想定年利を入力できるフォームを追加
  - 必要月額、年間積立額、将来資産額、運用益をカード表示する結果セクションを追加
  - 保守、標準、積極の3シナリオ比較カードを追加
  - `recharts` を使った資産推移グラフを追加
- 理由:
  - ユーザーが目標金額と期間をもとに、必要な積立水準と将来の着地イメージを直感的に確認できるようにするため
- 関連ファイル:
  - [src/app/dashboard/simulation/page.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/app/dashboard/simulation/page.tsx)
  - [src/features/dashboard/simulation/hooks/useSimulation.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/simulation/hooks/useSimulation.ts)
  - [src/features/dashboard/simulation/utils/calculations.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/simulation/utils/calculations.ts)
  - [src/features/dashboard/simulation/components/SimulationForm.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/simulation/components/SimulationForm.tsx)
  - [src/features/dashboard/simulation/components/SimulationResult.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/simulation/components/SimulationResult.tsx)
  - [src/features/dashboard/simulation/components/ScenarioCards.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/simulation/components/ScenarioCards.tsx)
  - [src/features/dashboard/simulation/components/SimulationChart.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/simulation/components/SimulationChart.tsx)

### 認証とダッシュボード導線: 無効トークン時の混乱と空画面を改善

- 対象: ログイン画面、ダッシュボード共通導線、認証チェック
- 変更内容:
  - `middleware` は `/dashboard` 配下の未ログイン判定だけに絞り、`/login` 側のリダイレクトはサーバー側検証へ移行
  - `src/app/dashboard/layout.tsx` を追加し、ダッシュボード配下で有効トークンをサーバー検証するように変更
  - ログイン画面は有効なセッションがある場合 `/dashboard/household` へ遷移するように変更
  - `/dashboard` は空ページの代わりに `/dashboard/household` へリダイレクトするように変更
  - ダッシュボードのサブナビをモバイルでも見える横スクロール表示に変更
  - simulation ページが空だったため、準備中メッセージを表示するように変更
- 理由:
  - Cookie が残っているだけで認証済みに見える状態や、ログイン後に内容のない画面へ着地する状態をなくし、Next.js のサーバー側導線と実際の API 認証を揃えるため
- 関連ファイル:
  - [middleware.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/middleware.ts)
  - [src/app/dashboard/layout.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/app/dashboard/layout.tsx)
  - [src/app/dashboard/page.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/app/dashboard/page.tsx)
  - [src/app/login/page.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/app/login/page.tsx)
  - [src/components/navigation/dashboardHeader.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/components/navigation/dashboardHeader.tsx)
  - [src/components/navigation/hooks/useNavigation.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/components/navigation/hooks/useNavigation.ts)
  - [src/app/dashboard/simulation/page.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/app/dashboard/simulation/page.tsx)

### 認証フォーム: state リセット方式とデバッグログを整理

- 対象: ログイン／新規登録フォーム
- 変更内容:
  - `useEffect` によるフォーム state リセットを廃止
  - モード切り替え時は `key` による再マウントで状態を初期化するように変更
  - フォーム送信処理の大量な `console.log` を削除
  - ログイン／新規登録成功後の遷移先を `/dashboard/household` に統一
- 理由:
  - React の警告対象になっていた state リセット方法を解消し、入力途中での不自然な状態消去やログイン後の空画面遷移を避けるため
- 関連ファイル:
  - [src/features/auth/AuthForm.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/auth/AuthForm.tsx)
  - [src/features/auth/hooks/useAuthForm.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/auth/hooks/useAuthForm.ts)
  - [src/components/household/hooks/useAsyncState.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/components/household/hooks/useAsyncState.ts)
  - [src/lib/auth.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/lib/auth.ts)

### 家計簿: 期間フィルタと一覧、保存後更新、取得失敗時 UI を整合

- 対象: household 画面のサマリー、Budget Tab、保存処理
- 変更内容:
  - 期間フィルタ状態を `household/page.tsx` に持ち上げて、`SummaryCard` と `BudgetTab` の両方で共有
  - `BudgetTab` の取得処理に期間クエリを渡すように変更
  - `useBudgetItems` に読み込み中、エラー、401 時ログイン誘導の処理を追加
  - `useBudgetForm` の `useCallback` 依存関係を修正し、成功時のみ `triggerRefetch` するように変更
- 理由:
  - サマリーだけ期間指定されて一覧は全件、という表示不整合をなくし、保存後更新とデータ取得失敗時の UX を安定化するため
- 関連ファイル:
  - [src/app/dashboard/household/page.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/app/dashboard/household/page.tsx)
  - [src/features/dashboard/household/components/SummaryCard.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/components/SummaryCard.tsx)
  - [src/features/dashboard/household/components/BudgetForm/BudgetContents.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/components/BudgetForm/BudgetContents.tsx)
  - [src/features/dashboard/household/components/BudgetForm/BudgetTab/BudgetTab.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/components/BudgetForm/BudgetTab/BudgetTab.tsx)
  - [src/features/dashboard/household/hooks/useBudgetItems.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/hooks/useBudgetItems.ts)
  - [src/features/dashboard/household/hooks/useBudgetForm.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/hooks/useBudgetForm.ts)

### 家計簿: カスタムカテゴリが Budget Tab に表示されない問題を修正

- 対象: 家計簿の Budget Tab 表示
- 変更内容:
  - `BudgetTab` のカテゴリ行生成を、`CategoryContext` だけでなく取得済み `items` の `category` も含めるように変更
  - カスタムカテゴリのラベルが翻訳キーではない場合は、そのまま文字列として表示するように変更
- 理由:
  - カスタムカテゴリは API と DB には保存されていたが、Budget Tab 側がメモリ上の `CategoryContext` のみを参照していたため、再読み込み後などにカテゴリ行が欠落していた
- 関連ファイル:
  - [src/features/dashboard/household/components/BudgetForm/BudgetTab/BudgetTab.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/components/BudgetForm/BudgetTab/BudgetTab.tsx)
  - [src/contexts/ CategoryContext.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/contexts/%20CategoryContext.tsx)
  - [src/features/dashboard/household/hooks/useBudgetItems.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/hooks/useBudgetItems.ts)

### 家計簿: 金額表示を正確な円表示に統一

- 対象: 家計簿の金額表示全体
- 変更内容:
  - `formatAmount` を更新し、`万円` 変換を廃止
  - 常に正確な数値を `￥` プレフィックス付きで表示するように統一
  - `null`、空文字、負数、文字列入力中の値にも崩れにくい表示に調整
- 変更前:
  - `10,000` 以上は `x.x万円（￥...）`
  - それ未満は `...円`
- 変更後:
  - 常に `￥123,456` の形式
  - 負数は `-￥5,000` の形式
- 理由:
  - 省略表記ではなく、常に正確な円金額を見たいという要件に合わせるため
- 関連ファイル:
  - [src/features/dashboard/household/utils/useBudgetMoney.ts](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/utils/useBudgetMoney.ts)
  - [src/features/dashboard/household/components/SummaryCard.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/components/SummaryCard.tsx)
  - [src/features/dashboard/household/components/BudgetForm/BudgetTab/BudgetCategoryRow.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/components/BudgetForm/BudgetTab/BudgetCategoryRow.tsx)
  - [src/features/dashboard/household/components/BudgetForm/BudgetTab/BudgetTable.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/components/BudgetForm/BudgetTab/BudgetTable.tsx)
  - [src/features/dashboard/household/components/BudgetForm/BudgetForm/BudgetIncomeForm.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/components/BudgetForm/BudgetForm/BudgetIncomeForm.tsx)
  - [src/features/dashboard/household/components/BudgetForm/BudgetForm/BudgetExpenseForm.tsx](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/src/features/dashboard/household/components/BudgetForm/BudgetForm/BudgetExpenseForm.tsx)

### ドキュメント: 入口と導線を追加

- 対象: リポジトリのドキュメント構成
- 変更内容:
  - プロジェクト概要用の `README.md` を実装ベースの内容に更新
  - ドキュメント入口として `docs/README.ja.md` を追加
  - 今回から変更履歴をこの `docs/CHANGELOG.ja.md` に集約
- 理由:
  - コード量が増えたため、全体像、読む順番、変更履歴を分離して追えるようにするため
- 関連ファイル:
  - [README.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/README.md)
  - [docs/README.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/README.ja.md)
  - [docs/CHANGELOG.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/CHANGELOG.ja.md)
