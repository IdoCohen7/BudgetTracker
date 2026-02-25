using BTServer.Models;

namespace BTServer.DTOs.Expense
{
   public record ExpenseDTO(int id, string? description, decimal sum, Category category, DateTime createdAt);
}
