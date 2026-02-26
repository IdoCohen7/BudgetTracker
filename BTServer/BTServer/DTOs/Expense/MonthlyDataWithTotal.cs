namespace BTServer.DTOs.Expense
{
    public record MonthlyDataWithTotal(List<ExpenseInCategory> list, decimal total);
}
