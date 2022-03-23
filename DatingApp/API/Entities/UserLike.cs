namespace API.Entities
{
    public class UserLike
    {
        public AppUser SourceUser { get; set; } // the user who liked the other user
        public int SourceUserId { get; set; }
        public AppUser LikedUser { get; set; } // the user who was liked
        public int LikedUserId { get; set; }

        


    }
}