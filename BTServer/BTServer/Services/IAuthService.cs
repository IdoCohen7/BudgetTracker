
using BTServer.DTOs.User;

namespace BTServer.Services
{
    public interface IAuthService
    {
        Task<UserDTO> Register(RegisterRequest request);

        Task<UserDTO> GetUser(int id);

        Task<UserDTO> Login(LoginRequest request);
    }
}
