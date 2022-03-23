using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
         Task <UserLike> GetUserLike(int sourceUserId, int likedUserId); 
         Task<AppUser> GetUserWithLikes(int userId); // get the user with the likes

        Task <PagedList<LikeDto>> GetUserLikes(LikesParams likesParams); // get the likes of the user

        
    }
}