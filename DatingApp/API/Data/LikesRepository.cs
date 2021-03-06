using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;

        public LikesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserLike> GetUserLike(int sourceUserId, int likedUserId)
        {
            return await _context.Likes.FindAsync(likedUserId,sourceUserId);
        }

        // get the user with the likes
        public async Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams  )
        {
            // liked => "which users this user liked" => userId is the sourceUserId
            // liked By => "who users has liked this user" => userId is the likedUserId
            
            IQueryable<AppUser> users;
            var likes = _context.Likes.AsQueryable();

            if (likesParams.Predicate == "liked")
            {
                likes = likes.Where(like => like.SourceUserId == likesParams.UserId);
                users = likes.Select(like => like.LikedUser);
            }
            else
            {
                likes = likes.Where(like => like.LikedUserId == likesParams.UserId);
                users = likes.Select(like => like.SourceUser);
            }

            var likedUsers = users.Select(user => new LikeDto{
            
                Age = user.DateOfBirth.CalculateAge(),
                City = user.City,
                Country = user.Country,
                Id = user.Id,
                KnownAs = user.KnownAs,
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                UserName = user.UserName
            });

            return await PagedList<LikeDto>.CreateAsync(likedUsers,likesParams.PageNumber,likesParams.PageSize); 
          
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.Users
                .Include(u => u.LikedUsers)
                .FirstOrDefaultAsync(u => u.Id == userId);
        }

        
    }

}