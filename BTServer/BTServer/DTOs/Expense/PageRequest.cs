namespace BTServer.DTOs.Expense
{
   public record PageRequest(int pageNumber = 1, int pageSize = 10);
}
