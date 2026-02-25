using BTServer.Data;
using BTServer.DTOs.User;
using BTServer.Helpers;
using BTServer.Models;
using Mapster;
using Microsoft.AspNetCore.Identity;
using BTServer.Helpers;
using Microsoft.EntityFrameworkCore;

namespace BTServer.Services
{
    public class AuthService : IAuthService
    {
        private readonly DBContext _dbcontext;
        private readonly ITokenService _tokenService;
        public AuthService(DBContext context, ITokenService tokenService)
        {
            _dbcontext = context;
            _tokenService = tokenService;
        }

        public async Task<UserDTO> GetUser(int id)
        {
            try
            {
                var user = await _dbcontext.Users.FirstOrDefaultAsync(u => u.Id == id);
                if (user == null)
                {
                    return null;
                }

                return user.Adapt<UserDTO>();
            }

            catch (Exception ex)
            {
                throw;
            }
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

                return new UserDTO
                (
                    newUser.Id,
                    newUser.Name,
                    newUser.Email,
                    _tokenService.CreateToken(newUser)
                );
            }

            catch (Exception ex)
            {
                {
                    throw;
                }

            }

        }

        public async Task<UserDTO> Login(LoginRequest request)
        {
            try
            {

                var user = await _dbcontext.Users.FirstOrDefaultAsync(u => u.Email == request.email);

                if (user == null || !PassowrdHasher.VerifyPassword(request.password, user.PasswordHash))
                {
                    throw new Exception("ERROR: wrong email or password");
                }


                return new UserDTO(
                    user.Id,
                    user.Name,
                    user.Email,
                    _tokenService.CreateToken(user)
                );
               
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
