import api from "../api/axiosInstance";

const expenseService = {
  getAllExpenses: () => {
    let url = `api/Expense`;
    return api.get(url);
  },
  createExpense: (description, sum, category) => {
    return api.post("/api/Expense", {
      description,
      sum,
      category,
    });
  },
  getExpensesChart: () => {
    return api.get("/api/Expense/Chart");
  },
};

export default expenseService;
