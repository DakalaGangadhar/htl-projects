using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace DigitalBooks.Models
{
    public partial class digitalbooksDBContext : DbContext
    {
        public digitalbooksDBContext()
        {
        }

        public digitalbooksDBContext(DbContextOptions<digitalbooksDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Author> Authors { get; set; }
        public virtual DbSet<Authorlogin> Authorlogins { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=CTSDOTNET854;Initial Catalog=digitalbooksDB;User ID=sa;Password=pass@word1");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Author>(entity =>
            {
                entity.ToTable("author");

                entity.Property(e => e.Active).HasColumnName("active");

                entity.Property(e => e.Author1).HasColumnName("author");

                entity.Property(e => e.Category).HasColumnName("category");

                entity.Property(e => e.Contentdata).HasColumnName("contentdata");

                entity.Property(e => e.Image).HasColumnName("image");

                entity.Property(e => e.Price)
                    .HasColumnType("money")
                    .HasColumnName("price");

                entity.Property(e => e.Publisher).HasColumnName("publisher");

                entity.Property(e => e.Releasedate)
                    .HasColumnType("datetime")
                    .HasColumnName("releasedate");

                entity.Property(e => e.Title).HasColumnName("title");
            });

            modelBuilder.Entity<Authorlogin>(entity =>
            {
                entity.ToTable("authorlogin");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .IsUnicode(false)
                    .HasColumnName("username");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
