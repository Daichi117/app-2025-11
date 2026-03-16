// app/dashboard/household/types/period.ts

// ① 期間の種類
export type PresetPeriod = 'monthly' | 'yearly' | 'all';

// ② カスタム範囲
export interface CustomPeriodRange {
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
}

// ③ 統一フィルター
export type PeriodFilter = 
  | { type: 'preset'; period: PresetPeriod }
  | { type: 'custom'; range: CustomPeriodRange };

// ④ 画面表示用の情報
export interface PeriodInfo {
  label: string;
  startDate: Date;
  endDate: Date;
}

// ⑤ 収入・支出のデータ型（APIから取得する想定）
export interface Transaction {
  id: string;
  amount: number;
  date: string; // YYYY-MM-DD
  category: string;
  type: 'income' | 'expense'; // 収入か支出か
}

// ⑥ 日別集計の結果型
export interface DailyStats {
  income: number;
  expense: number;
}