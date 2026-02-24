
using BTServer.DTOs.User;

namespace BTServer.Services
{
    public interface IAuthService
    {
        Task<UserDTO> Register(RegisterRequest request);
    }
}
