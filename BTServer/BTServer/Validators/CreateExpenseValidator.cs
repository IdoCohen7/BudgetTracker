using BTServer.DTOs.Expense;
using FluentValidation;

namespace BTServer.Validators
{
    public class CreateExpenseValidator : AbstractValidator<CreateExpense>
    {
        public CreateExpenseValidator()
        {
            RuleFor(x => x.description)
                .MaximumLength(500)
                .WithMessage("ERROR: max length for description is 500");

            RuleFor(x => x.sum)
                .NotEmpty()
                .GreaterThanOrEqualTo(0)
                .WithMessage("ERORR: sum is required and needs to be 0 and above");

            RuleFor(x => x.category)
                .NotEmpty()
                .IsInEnum()
                .WithMessage("ERROR: invalid category");
                
        }
    }
}
