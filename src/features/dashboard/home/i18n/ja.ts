const ja = {
  hero: {
    eyebrow: "Home dashboard",
    title: "今月の家計と資産の現在地",
    description:
      "家計簿で記録したお金の流れと、いま持っている資産の状況をまとめて確認できます。",
  },
  sections: {
    monthlyCashflow: "今月の収支",
    expenseBreakdown: "収入と支出内訳",
    recentActivity: "最近の記録",
    goalDigest: "目標サマリー",
  },
  descriptions: {
    expenseBreakdown: "累計収入が、累計固定費・累計変動費・現在資産額にどう配分されているかを円グラフで確認できます。",
    recentActivity: "最新の収入・支出を5件まで表示しています。",
    goalDigest: "目標と現在地の差は simulation で詳しく確認できます。",
  },
  labels: {
    currentAssets: "現在資産額（累計）",
    stockCaption: "累計収入 - 累計支出",
    income: "今月の収入",
    expense: "今月の支出",
    surplus: "今月の余剰資金",
    fixedExpense: "固定費",
    variableExpense: "変動費",
    incomeAllocation: "累計収入の配分",
    monthOverMonth: "先月比",
    currentMonthSurplus: "今月の余剰資金",
    monthUp: "先月より改善",
    monthDown: "先月より減少",
    monthFlat: "先月と同水準",
    changeAmount: "差額: {value}",
    incomeBadge: "収入",
    fixedBadge: "固定費",
    variableBadge: "変動費",
    targetAmount: "目標資産額",
    targetDate: "目標期限",
    requiredMonthly: "必要な毎月積立額",
    projectedAssets: "今の余剰ペースでの着地見込み",
    goalStatus: "目標との距離感",
  },
  links: {
    viewSimulation: "simulation で詳細を見る",
  },
  states: {
    loading: "ホームデータを読み込み中...",
    error: "ホームデータの取得に失敗しました",
    noPlan: "シミュレーションの保存済みプランがまだありません",
    onTrack: "今の余剰なら到達圏内です",
    offTrack: "あと月 {gap} の余剰が必要です",
    noRecentActivity: "まだ表示できる記録がありません",
  },
};

export default ja;
