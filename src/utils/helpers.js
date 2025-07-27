// Financial calculation helpers
export const calculateTotalIncome = (transactions) => {
  return transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
};

export const calculateTotalExpense = (transactions) => {
  return transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
};

export const calculateBalance = (transactions) => {
  const income = calculateTotalIncome(transactions);
  const expense = calculateTotalExpense(transactions);
  return income - expense;
};

export const getCategoryExpenses = (transactions, categories) => {
  return categories.map(cat => ({
    category: cat,
    amount: transactions.filter(t => t.type === 'expense' && t.category === cat).reduce((sum, t) => sum + t.amount, 0)
  })).filter(item => item.amount > 0);
};

// Updated to use INR symbol
export const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const generateId = () => {
  return Date.now() + Math.random();
};