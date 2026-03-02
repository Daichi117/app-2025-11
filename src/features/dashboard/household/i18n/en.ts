export default {
  period: {
    daily: "Daily",
    monthly: "Monthly",
    yearly: "Yearly",
    all: "All-time",
    label: "Period:",
  },
  summary: {
    total: "Total Assets",
    income: "Income",
    expense: "Expenses",
    surplus: "Surplus",
    fixedExpense: "Fixed Expenses",
    variableExpense: "Variable Expenses",
    positive: "Positive Balance",
    negative: "Negative Balance",
  },
  form: {
    title: "Record Income & Expenses",
    amount: "Amount",
    category: "Category",
    date: "Date",
    month: "Month",
    memo: "Memo (Optional)",
    save: "Save",
    delete: "Delete",
    memoPlaceholder: "e.g., Groceries, Dining out, etc.",
  },
  categories: {
    income: {
      salary: "Salary",
      sidejob: "Side Job",
      bonus: "Bonus",
      investment: "Investment Income",
      other: "Other",
    },
    expense: {
      fixed: {
        rent: 'Rent',
        utilities: 'Utilities',
        communications: 'Communications',
        insurance: 'Insurance',
        subscriptions: 'Subscriptions',
        other: 'Other',
      },
      variable: {
        food: 'Food',
        transportation: 'Transportation',
        entertainment: 'Entertainment',
        medical: 'Medical',
        other: 'Other',
      }
    }
  },
  actions: {
    resetExpenses: "Reset Expenses",
    resetAll: "Reset All Data",
    confirmResetExpenses: "Are you sure you want to delete all expense data? This action cannot be undone.",
    confirmResetAll: "Are you sure you want to delete all data (income, expenses, investment simulations, etc.)? This action cannot be undone.",
  },
  messages: {
    invalidAmount: "Please enter a valid amount",
    incomeAdded: "Income added successfully",
    expenseAdded: "Expense added successfully",
    confirmDelete: "Are you sure you want to delete {item} ({amount})?",
  },
};