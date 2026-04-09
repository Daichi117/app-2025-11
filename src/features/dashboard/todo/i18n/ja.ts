const ja = {
  hero: {
    eyebrow: "Todo board",
    title: "見直しタスク",
    description:
      "simulation で見えた論点を、ここで自分の todo として整理して管理できます。",
  },
  form: {
    title: "todo を追加",
    description: "気になった項目を、自分の言葉で短く残しておくための入力欄です。",
    task: "やること",
    taskPlaceholder: "例: 家賃を見直す、残業代以外の収入を増やす",
    kind: "テーマ",
    category: "カテゴリ",
    categoryPlaceholder: "例: 家賃、食費、副業",
    note: "メモ",
    notePlaceholder: "simulation で見た差分や、次に確認したいことをメモできます。",
    submit: "todo を追加",
  },
  list: {
    title: "todo リスト",
    description: "未完了は {count} 件あります。",
    delete: "削除",
  },
  kind: {
    manual: "その他",
    income: "収入",
    fixed: "固定費",
    variable: "変動費",
  },
  states: {
    loading: "todo を読み込み中...",
    error: "todo の取得に失敗しました",
    empty: "まだ todo はありません。simulation を見ながら追加していきましょう。",
  },
};

export default ja;
