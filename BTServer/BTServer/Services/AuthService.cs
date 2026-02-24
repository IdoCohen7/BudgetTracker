using BTServer.Data;
using BTServer.DTOs.User;
using BTServer.Helpers;
using BTServer.Models;
using Mapster;

namespace BTServer.Services
{
    public class AuthService : IAuthService
    {
        private readonly DBContext _dbcontext;
        public AuthService(DBContext context)
        {
            _dbcontext = context;
        }

        public async Task<UserDTO> Register(RegisterRequest request)
        {
            if (request?.password != request?.passwordConfirm)
            {
                throw new Exception("Passwords do not match");
            }

            var newUser = new User
            {
                Name = request!.name,
                Email = request.email,
                PasswordHash = PassowrdHasher.HashPassword(request.password),
            };

            try
            {
                _dbcontext.Users.Add(newUser);
                await _dbcontext.SaveChangesAsync();
                return newUser.Adapt<UserDTO>();
            }

            catch (Exception ex)
            {
                {
                    throw;
                }

            }

        }
    }
}
