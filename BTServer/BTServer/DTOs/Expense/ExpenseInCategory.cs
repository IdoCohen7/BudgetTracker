using BTServer.Models;

namespace BTServer.DTOs.Expense
{
    public record ExpenseInCategory(Category category, decimal totalExpense);
}
