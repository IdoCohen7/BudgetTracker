using BTServer.DTOs.User;
using FluentValidation;

namespace BTServer.Validators
{
    public class RegisterValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterValidator()
        {
            RuleFor(x => x.name)
                .MaximumLength(50)
                .NotEmpty()
                .WithMessage("ERROR: name is required, 50 chars max");

            RuleFor(x => x.email)
                .EmailAddress()
                .NotEmpty()
                .MaximumLength(100)
                .WithMessage("ERROR: enter a valid email address, 100 chars max");

            RuleFor(x => x.password)
                .NotEmpty()
                .MaximumLength(30)
                .MinimumLength(6)
                .WithMessage("ERROR: password must be between 6-30 chars");

        }
    }
}
