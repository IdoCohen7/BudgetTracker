using BTServer.Data;
using BTServer.DTOs.Expense;
using BTServer.Models;
using Mapster;
using Microsoft.EntityFrameworkCore;
using System.Collections;
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
           

            // Validate that the category is a valid enum value
            // TODO: REMOVE when validators are put into project
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
                    UserId = GetUserId() 
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

        private int GetUserId()
        {
            var userIdString = _contextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            if (string.IsNullOrEmpty(userIdString))
            {
                throw new Exception("ERROR: You are not authorized to perform this action");
            }
            int userId = int.Parse(userIdString);

            return userId;
        }

        public async Task<List<ExpenseDTO>> GetAllUserExpenses()
        { 
            try
            {
                var expenses = await _context.Expenses.Where(e => e.UserId == GetUserId()).AsNoTracking().ToListAsync();

                return expenses.Adapt<List<ExpenseDTO>>();
            }

            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<ExpenseInCategory>> GetExpensesChart()
        {
            var expensesChart = await _context.Expenses
                .Where(e => e.UserId == GetUserId())
                .GroupBy(e => e.Category)
                .Select(g => new ExpenseInCategory(
                    g.Key,
                    g.Sum(e => e.Sum)
                ))
                .ToListAsync();

            return expensesChart;
        }

       
    }
}

