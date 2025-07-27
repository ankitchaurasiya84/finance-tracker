export const categories = ['Food', 'Transportation', 'Entertainment', 'Bills', 'Shopping', 'Healthcare', 'Education', 'Other'];

export const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Other'];

export const initialData = {
  transactions: [
    { id: 1, type: 'expense', amount: 4000, category: 'Food', description: 'Grocery shopping', date: '2025-07-20' },
    { id: 2, type: 'income', amount: 250000, category: 'Salary', description: 'Monthly salary', date: '2025-07-15' },
    { id: 3, type: 'expense', amount: 2000, category: 'Transportation', description: 'Petrol', date: '2025-07-18' },
    { id: 4, type: 'expense', amount: 8000, category: 'Entertainment', description: 'Movie night', date: '2025-07-22' }
  ],
  budgets: [
    { category: 'Food', budget: 25000, spent: 12000 },
    { category: 'Transportation', budget: 15000, spent: 6000 },
    { category: 'Entertainment', budget: 12000, spent: 8000 },
    { category: 'Bills', budget: 40000, spent: 0 }
  ],
  profile: { theme: 'light', currency: 'INR' }
};



