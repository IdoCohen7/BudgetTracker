using BTServer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BTServer.Data.Configurations
{
    public class ExpenseConfiguration : IEntityTypeConfiguration<Expense>
    {
        public void Configure(EntityTypeBuilder<Expense> builder)
        {
            builder.ToTable("Expenses");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Description)
                .HasMaxLength(500);

            // max 2 digits after floating point
            builder.Property(x => x.Sum)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(x => x.Category)
                .IsRequired();

            builder.Property(x => x.UserId)
                .IsRequired();  

            // establishing one to many relationship
            builder.HasOne(x => x.User)
                .WithMany(u => u.Expenses)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
