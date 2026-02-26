import api from "../api/axiosInstance";

const expenseService = {
  getAllExpenses: (pageNumber = 1, pageSize = 10) => {
    return api.get("/api/Expense", {
      params: {
        pageNumber,
        pageSize,
      },
    });
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
