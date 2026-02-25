using BTServer.Models;

namespace BTServer.DTOs.Expense
{
    public record CreateExpense(string? description, decimal sum, Category category);
}
