using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext :DbContext
    {
        public DataContext (DbContextOptions options) :base(options) { }

        public DbSet<AppUser> Users {get; set;}

        public DbSet<UserLike> Likes {get; set;}

        public DbSet<Message> Messages {get; set;}

         protected override void OnModelCreating(ModelBuilder Builder)
        {
            base.OnModelCreating(Builder);

            Builder.Entity<UserLike>()
                .HasKey(k => new {k.LikedUserId, k.SourceUserId}); // Primary key 

            Builder.Entity<UserLike>() // Many to many relationship 
                .HasOne(u => u.SourceUser) // the user who liked the other user 
                .WithMany(u => u.LikedUsers) // the user who was liked 
                .HasForeignKey(u => u.SourceUserId) 
                .OnDelete(DeleteBehavior.Cascade); 

            Builder.Entity<UserLike>() // Many to many relationship
                .HasOne(u => u.LikedUser) // the user who was liked
                .WithMany(u => u.LikedByUsers) // the user who liked the other user
                .HasForeignKey(u => u.LikedUserId) 
                .OnDelete(DeleteBehavior.Cascade); 

            
            Builder.Entity<Message>() 
                .HasOne(u => u.Sender)
                .WithMany(u => u.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);

            Builder.Entity<Message>()
                .HasOne(u => u.Recipient)
                .WithMany(u => u.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);
                
                

                
                
        }


    }


}