using BTServer.Models;

namespace BTServer.DTOs.Expense
{
    public record ExpenseChartResponse(
        List<ExpenseInCategory> Categories,
        decimal Total
    );
}
