// app/dashboard/household/utils/constants.ts

// このファイルは「カテゴリの正規キー」を定義する場所。
// UI表示文言ではなくキーを共通化することで、FE・API・DBのズレを減らす。
export type IncomeCategory = 'SALARY' | 'SIDEJOB' | 'BONUS' | 'INVESTMENTS' | 'OTHER';
export type FormType = 'NONE' | 'INCOME' | 'FIXED' | 'VARIABLE';

// value は翻訳キー。実際の表示文言は LanguageContext の t() が担当する。
export const INCOME_CATEGORIES: Record<IncomeCategory,string> = {
  SALARY: 'household.categories.income.salary',
  SIDEJOB: 'household.categories.income.sidejob',
  BONUS:'household.categories.income.bonus',
  INVESTMENTS: 'household.categories.income.investment',
  OTHER: 'household.categories.income.other',
}
// カテゴリの型定義
export type FixedExpenseCategory = 
  | 'RENT' 
  | 'UTILITIES' 
  | 'COMMUNICATIONS' 
  | 'INSURANCE' 
  | 'SUBSCRIPTIONS' 
  | 'OTHER';

export const FIXED_EXPENSE_CATEGORIES: Record<FixedExpenseCategory, string> = {
  RENT: 'household.categories.expense.fixed.rent',
  UTILITIES: 'household.categories.expense.fixed.utilities',
  COMMUNICATIONS: 'household.categories.expense.fixed.communications',
  INSURANCE: 'household.categories.expense.fixed.insurance',
  SUBSCRIPTIONS: 'household.categories.expense.fixed.subscriptions',
  OTHER:'household.categories.expense.fixed.other',
};
export type VariableExpenseCategory = 
  | 'FOOD'           // 食費
  | 'TRANSPORTATION' // 交通費
  | 'ENTERTAINMENT'  // 娯楽費
  | 'MEDICAL'        // 医療費
  | 'OTHER';         // その他

// 収入カテゴリと同じく、表示用文字列ではなく翻訳キーを保持する。
export const VARIABLE_EXPENSE_CATEGORIES: Record<VariableExpenseCategory,string> = {
  FOOD: 'household.categories.expense.variable.food',
  TRANSPORTATION: 'household.categories.expense.variable.transportation',
  ENTERTAINMENT: 'household.categories.expense.variable.entertainment',
  MEDICAL: 'household.categories.expense.variable.medical',
  OTHER: 'household.categories.expense.variable.other',
};

export type ExpenseCategory = FixedExpenseCategory | VariableExpenseCategory
