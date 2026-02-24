using BTServer.DTOs.User;
using BTServer.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BTServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;
        public AuthController(IAuthService service)
        {
            _service = service;
        }
        // GET api/<AuthController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AuthController>
        [HttpPost]
        public async Task<ActionResult<UserDTO>> Post([FromBody] RegisterRequest request)
        {
            try
            {
                var newUser = await _service.Register(request);

                return Ok(newUser);
                
            }

            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        
    }
}
