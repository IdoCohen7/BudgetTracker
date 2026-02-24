namespace BTServer.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public string? Description { get; set; } 

        public decimal Sum { get; set; } = 0;
        public Category Category { get; set; } = Category.Other;
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public User User { get; set; }  

        public int UserId {  get; set; }

    }
}
