namespace API.Helpers
{
    public class MessageParams : PaginationParams
    {
        public string UserName { get; set; }
        public string Container { get; set; } = "Unread";


        public string ReceiverUserName { get; set; }

        public string SenderUserId { get; set; }

        public string ReceiverUserId { get; set; }

        public string SenderUserNameOrReceiverUserName { get; set; }


    }
}