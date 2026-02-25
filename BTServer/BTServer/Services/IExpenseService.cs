using BTServer.DTOs.Expense;

namespace BTServer.Services
{
    public interface IExpenseService
    {
        Task<ExpenseDTO> CreateExpense(CreateExpense createExpenseRequest);
        Task<List<ExpenseDTO>> GetAllUserExpenses();
    }
}
