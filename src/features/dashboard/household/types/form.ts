// app/dashboard/household/utils/constants.ts

export type IncomeCategory = 'SALARY' | 'SIDEJOB' | 'BONUS' | 'INVESTMENTS' | 'OTHER';
export type FormType = 'NONE' | 'INCOME' | 'FIXED' | 'VARIABLE';
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

export const VARIABLE_EXPENSE_CATEGORIES: Record<VariableExpenseCategory,string> = {
  FOOD: 'household.categories.expense.variable.food',
  TRANSPORTATION: 'household.categories.expense.variable.transportation',
  ENTERTAINMENT: 'household.categories.expense.variable.entertainment',
  MEDICAL: 'household.categories.expense.variable.medical',
  OTHER: 'household.categories.expense.variable.other',
};

export type ExpenseCategory = FixedExpenseCategory | VariableExpenseCategory

