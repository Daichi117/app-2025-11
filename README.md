# daichi-investment

資産管理・家計簿を中心にした Next.js アプリです。現在は主に次の機能を持っています。

- 認証: 登録、ログイン、ログアウト
- 家計簿: 収入、固定費、変動費の登録と一覧表示
- 多言語: 日本語、英語
- シミュレーション関連 API

## 開発開始

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認します。

## ドキュメント入口

全体像を把握したい場合は、まず次を読んでください。

- [docs/README.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/README.ja.md)
- [docs/ARCHITECTURE.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/ARCHITECTURE.ja.md)
- [docs/CHANGELOG.ja.md](/Users/shintanitaichi/Desktop/portfolio-Daichi/daichi-investment/docs/CHANGELOG.ja.md)

## 主要ディレクトリ

- `src/app`: App Router のページと API
- `src/features`: 画面ごとの UI、hooks、types
- `src/contexts`: アプリ横断の状態管理
- `src/lib`: 認証、DB、共通ユーティリティ
- `prisma`: スキーマとマイグレーション
- `docs`: 設計と運用ドキュメント

## 補足

- 家計簿のカスタムカテゴリは `custom_categories` テーブルに永続化し、`/api/household/categories` 経由で取得・追加・削除します。
- 詳細なアーキテクチャとデータフローは `docs/README.ja.md` にまとめています。
