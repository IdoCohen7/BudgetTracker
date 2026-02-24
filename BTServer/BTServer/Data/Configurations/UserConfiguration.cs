using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BTServer.Models;

namespace BTServer.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {

        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(x => x.Email)
                .IsRequired()
                .HasMaxLength(100);

            // making sure email is unique
            builder.HasIndex(x => x.Email)
                .IsUnique();

            // for max length after hashing
            builder.Property(x => x.PasswordHash)
                .IsRequired()
                .HasMaxLength(150);

         


        }
    }
}
