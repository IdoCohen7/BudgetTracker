import { createContext, useContext, useState, useEffect } from "react";
import expenseService from "../services/expenseService";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const fetchExpenses = async (pageNumber = 1, append = false) => {
    try {
      setLoading(true);
      const response = await expenseService.getAllExpenses(
        pageNumber,
        pageSize,
      );
      const newItems = response.data.items || response.data || [];

      if (append) {
        setExpenses((prev) => [...prev, ...newItems]);
      } else {
        setExpenses(newItems);
      }

      // Check if there are more items to load
      setHasMore(newItems.length === pageSize);
      setCurrentPage(pageNumber);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!loading && hasMore) {
      await fetchExpenses(currentPage + 1, true);
    }
  };

  const addExpense = async (description, sum, category) => {
    await expenseService.createExpense(description, sum, category);
    await fetchExpenses(1, false); // Refresh list from beginning
  };

  const refreshExpenses = () => {
    fetchExpenses(1, false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        error,
        hasMore,
        loadMore,
        addExpense,
        refreshExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenses = () => useContext(ExpenseContext);
