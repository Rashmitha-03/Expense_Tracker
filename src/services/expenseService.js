import api from "./api";

export const addExpense = (expenseData) => {
  return api.post("/api/expenses", expenseData);
};

export const getExpenses = () => {
  return api.get("/api/expenses");
};


export const getMonthlyExpenses = (month, year) => {
  return api.get(`/api/expenses/monthly?month=${month}&year=${year}`);
};

export const getWeeklyExpenses = () => {
  return api.get("/api/expenses/weekly");
};

export const deleteExpense = (id) => {
  return api.delete(`/api/expenses/${id}`);
};

export const getExpenseById = (id) => {
  return api.get(`/api/expenses/${id}`);
}
export const updateExpense = (id, expenseData) => {
  return api.put(`/api/expenses/${id}`, expenseData);
}