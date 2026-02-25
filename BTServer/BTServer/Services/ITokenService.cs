using BTServer.Models;

public interface ITokenService
{
    string CreateToken(User user);
}