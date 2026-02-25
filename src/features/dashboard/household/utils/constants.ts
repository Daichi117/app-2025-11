// app/dashboard/household/utils/constants.ts

// カテゴリの型定義
export type ExpenseCategory = 
  | 'RENT' 
  | 'UTILITIES' 
  | 'COMMUNICATIONS' 
  | 'INSURANCE' 
  | 'SUBSCRIPTIONS'
  | 'FOOD'
  | 'TRANSPORTATION'
  | 'ENTERTAINMENT'
  | 'MEDICAL'
  | 'OTHER';

// 期間の型定義
export type TimePeriod = 'daily' | 'monthly' | 'yearly' | 'all';

// カテゴリの日本語名
export const EXPENSE_CATEGORIES: Record<ExpenseCategory, string> = {
  RENT: 'categories.expense.rent',
  UTILITIES: 'categories.expense.utilities',
  COMMUNICATIONS: 'categories.expense.communications',
  INSURANCE: 'categories.expense.insurance',
  SUBSCRIPTIONS: 'categories.expense.subscriptions',
  FOOD: 'categories.expense.food',
  TRANSPORTATION: 'categories.expense.transportation',
  ENTERTAINMENT: 'categories.expense.entertainment',
  MEDICAL: 'categories.expense.medical',
  OTHER: 'categories.expense.other',
};

// カテゴリの種類（固定費 or 変動費）
export const CATEGORY_TYPES: Record<ExpenseCategory,string> = {
  RENT: 'categories.expense.expenseCategory.rent',
  UTILITIES: 'categories.expense.expenseCategory.utilities',
  COMMUNICATIONS: 'categories.expense.expenseCategory.communications',
  INSURANCE: 'categories.expense.expenseCategory.insurance',
  SUBSCRIPTIONS: 'categories.expense.expenseCategory.subscriptions',
  FOOD: 'categories.expense.expenseCategory.food',
  TRANSPORTATION: 'categories.expense.expenseCategory.transportation',
  ENTERTAINMENT: 'categories.expense.expenseCategory.entertainment',
  MEDICAL: 'categories.expense.expenseCategory.medical',
  OTHER: 'categories.expense.expenseCategory.other',
};

// 固定費のカテゴリ一覧
export const FIXED_CATEGORIES: ExpenseCategory[] = [
  'RENT',
  'UTILITIES',
  'COMMUNICATIONS',
  'INSURANCE',
  'SUBSCRIPTIONS',
];

// 変動費のカテゴリ一覧
export const VARIABLE_CATEGORIES: ExpenseCategory[] = [
  'FOOD',
  'TRANSPORTATION',
  'ENTERTAINMENT',
  'MEDICAL',
  'OTHER',
];

// ページネーションの設定
export const ITEMS_PER_PAGE = 10;