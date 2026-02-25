using BTServer.Data;
using BTServer.DTOs.Expense;
using BTServer.Models;
using Mapster;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BTServer.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly DBContext _context;
        private readonly IHttpContextAccessor _contextAccessor;
        public ExpenseService(DBContext context, IHttpContextAccessor contextAccessor)
        {
            _context = context;
            _contextAccessor = contextAccessor;
        }

        public async Task<ExpenseDTO> CreateExpense(CreateExpense createExpenseRequest)
        {
            var userIdString = _contextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdString))
            {
                throw new Exception("ERROR: You are not authorized to perform this action");
            }
            int userId = int.Parse(userIdString);

            // Validate that the category is a valid enum value
            if (!Enum.IsDefined(typeof(Category), createExpenseRequest.category))
            {
                throw new Exception($"ERROR: Invalid category value. Valid categories are: {string.Join(", ", Enum.GetNames(typeof(Category)))}");
            }

            try
            {
                var newExpense = new Expense
                {
                    Description = createExpenseRequest.description,
                    Sum = createExpenseRequest.sum,
                    Category = createExpenseRequest.category,
                    UserId = userId  
                };

                _context.Expenses.Add(newExpense);
                await _context.SaveChangesAsync();

                return newExpense.Adapt<ExpenseDTO>();
            }

            catch (Exception ex)
            {
                throw;
            }
        }


        public async Task<List<ExpenseDTO>> GetAllUserExpenses()
        {
            var userIdString = _contextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            Console.WriteLine("x:", userIdString);

            if (string.IsNullOrEmpty(userIdString))
            {
                throw new Exception("ERROR: You are not authorized to perform this action");
            }
            int userId = int.Parse(userIdString);

            try
            {
                var expenses = await _context.Expenses.Where(e => e.UserId == userId).AsNoTracking().ToListAsync();

                return expenses.Adapt<List<ExpenseDTO>>();
            }

            catch (Exception ex)
            {
                throw;
            }


        }
    }
}

