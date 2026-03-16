export default {
    period: {
      daily: "今日",
      monthly: "今月",
      yearly: "今年",
      all: "累計",
      label: "表示期間：",
      custom:  "カスタム",  // ← 追加
      apply:   "適用",   
    },
    summary: {
      total:"資産総額",
      income: "収入",
      expense: "支出",
      surplus: "余剰資金",
      fixedExpense: "固定費",
      variableExpense: "変動費",
      positive: "プラス収支",
      negative: "マイナス収支",
    },
    form: {
      title: "収入と支出を記録",
      amount: "金額",
      category: "カテゴリ",
      date: "日付",
      month: "月",
      memo: "メモ（任意）",
      save: "保存",
      delete: "削除",
      memoPlaceholder: "例: スーパー、外食など",
    },
    categories: {
      income: {
        salary: "給与（会社からの給料）",
        sidejob: "副業",
        bonus: "賞与（ボーナス）",
        investment: "投資収益",
        other: "その他",
      },
      expense: {
        // 表示ラベルのグループ分け
        fixed: {
          rent: '家賃',
          utilities: '水道光熱費',
          communications: '通信費',
          insurance: '保険料',
          subscriptions: 'サブスク',
          other: 'その他',
        },
        variable: {
          food: '食費',
          transportation: '交通費',
          entertainment: '娯楽費',
          medical: '医療費',
          other: 'その他',
        }
      }
    },
    actions: {
      resetExpenses: "支出をリセット",
      resetAll: "全データをリセット",
      confirmResetExpenses: "全ての支出データを削除しますか？この操作は取り消せません。",
      confirmResetAll: "全てのデータ（収入・支出・投資シミュレーション結果など）を削除しますか？この操作は取り消せません。",
    },
    messages: {
      invalidForm:" 上のボタンから入力する項目を選んでください",
      invalidAmount: "正しい金額を入力してください",
      zeroAmount:"ゼロ以上の値を入力してください",
      invalidCategory:"カテゴリーを選択してください",
      incomeAdded: "収入を追加しました",
      expenseAdded: "支出を追加しました",
      saveSuccess:"保存しました",
      confirmDelete: "{item}（{amount}）を削除しますか？",
        deleteSuccess: "削除しました",
  deleteError: "削除に失敗しました",
  loading: "読み込み中...",
  noData: "データがありません",
  itemCount: "件",
    },
};