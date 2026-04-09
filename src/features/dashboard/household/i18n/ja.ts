const ja = {
  period: {
    daily: "今日",
    monthly: "今月",
    yearly: "今年",
    all: "累計",
    label: "表示期間：",
    custom: "カスタム",
    apply: "適用",
    selectRange: "期間を指定",
    startDate: "開始日",
    endDate: "終了日",
  },

  summary: {
    total: "資産総額",
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
      fixed: {
        rent: "家賃",
        utilities: "水道光熱費",
        communications: "通信費",
        insurance: "保険料",
        subscriptions: "サブスク",
        other: "その他",
      },
      variable: {
        food: "食費",
        transportation: "交通費",
        entertainment: "娯楽費",
        medical: "医療費",
        other: "その他",
      },
    },
  },

  actions: {
    // リセット
    resetExpenses: "支出をリセット",
    resetAll: "全データをリセット",
    resetCustom: "カスタムをリセット",       // ✅ 追加
    removeSelectedCustom: "選択カテゴリを削除",
    confirmResetExpenses: "全ての支出データを削除しますか？この操作は取り消せません。",
    confirmResetAll: "全てのデータ（収入・支出・投資シミュレーション結果など）を削除しますか？この操作は取り消せません。",
    // カテゴリ
    addCategory: "カテゴリーを追加",
    categoryPlaceholder: "カテゴリー名を入力",  // ✅ 追加
    customCategory: "カスタム",                // ✅ 追加
    // 共通
    add: "追加",
    cancel: "キャンセル",
  },

  messages: {
    // バリデーション
    invalidForm: "上のボタンから入力する項目を選んでください",
    invalidAmount: "正しい金額を入力してください",
    zeroAmount: "ゼロ以上の値を入力してください",
    invalidCategory: "カテゴリーを選択してください",
    // 成功
    incomeAdded: "収入を追加しました",
    expenseAdded: "支出を追加しました",
    saveSuccess: "保存しました",
    saveError: "保存に失敗しました",
    // 削除
    confirmDelete: "{item}（{amount}）を削除しますか？",
    deleteSuccess: "削除しました",
    deleteError: "削除に失敗しました",
    // その他
    loading: "読み込み中...",
    noData: "データがありません",
    itemCount: "{count}件",
  },

  /** Route Handler 用（createServerTranslator） */
  api: {
    authRequired: "認証が必要です",
    requiredFields: "必須項目を入力してください",
    amountPositive: "金額は0より大きい値を入力してください",
    typeInvalid: "支出区分は固定費または変動費である必要があります",
    notFound: "見つかりません",
    serverError: "サーバーエラー",
  },
}

export default ja;
