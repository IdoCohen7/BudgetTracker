namespace BTServer.DTOs.User
{
    public record RegisterRequest(string name, string email, string password, string passwordConfirm);
}
