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
        public async Task<ActionResult<UserDTO>> Get(int id)
        {
            try
            {
                var user = await _service.GetUser(id);
                if (user == null)
                {
                    return NotFound("No user matches this id");
                }

                return Ok(user);


            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET api/<AuthController>/5
        [HttpPost("Login")]
        public async Task<ActionResult<UserDTO>> Login([FromBody]LoginRequest loginRequest)
        {
            try
            {
                var user = await _service.Login(loginRequest);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // POST api/<AuthController>
        [HttpPost]
        public async Task<ActionResult<UserDTO>> Post([FromBody] RegisterRequest request)
        {
            try
            {
                var newUser = await _service.Register(request);

                return CreatedAtAction(nameof(Get), new { id = newUser.id }, newUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        
    }
}
