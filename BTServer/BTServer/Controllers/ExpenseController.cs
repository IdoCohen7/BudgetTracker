using BTServer.DTOs.Expense;
using BTServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
        // GET: api/<ExpenseController>
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

        // GET api/<ExpenseController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ExpenseController>
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

        // PUT api/<ExpenseController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ExpenseController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
