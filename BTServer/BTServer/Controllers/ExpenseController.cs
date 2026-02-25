using BTServer.DTOs.Expense;
using BTServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BTServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _service;
        public ExpenseController(IExpenseService service)
        {
            _service = service;
        }

        // GET: api/Expense
        [HttpGet]
        public async Task<ActionResult<List<ExpenseDTO>>> Get()
        {
            try
            {
                var expenses = await _service.GetAllUserExpenses();
                return Ok(expenses);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET: api/Expense/chart
        [HttpGet("chart")]
        public async Task<ActionResult<List<ExpenseInCategory>>> GetExpensesChart()
        {
            try
            {
                var chart = await _service.GetExpensesChart();
                return Ok(chart);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // POST: api/Expense
        [HttpPost]
        public async Task<ActionResult<ExpenseDTO>> Post([FromBody] CreateExpense createExpenseRequest)
        {
            try
            {
                var newExpense = await _service.CreateExpense(createExpenseRequest);
                return Ok(newExpense);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}