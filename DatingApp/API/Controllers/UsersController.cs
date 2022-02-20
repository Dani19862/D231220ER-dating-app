using System.Net;
using System.Linq;
using System.Security.Claims;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using API.Entities;
using API.Extensions;
using CloudinaryDotNet.Actions;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _userRepository = userRepository;
            _mapper = mapper;
        }
       
    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
      {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; //nameid

        var user = await _userRepository.GetUserByUserNameAsync(username);

        _mapper.Map(memberUpdateDto, user);

        _userRepository.Update(user);

        if (await _userRepository.SaveAllAsync())
        {
            return NoContent();
        }

        return BadRequest($"Updating user {user.Id} failed on save");
      }

    [HttpGet]
      public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
         var usersToReturn = await _userRepository.GetMembersAsync();
         return Ok(usersToReturn);
        }

    [HttpGet("{username}", Name = "GetUser")]
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
        var userToReturn = await _userRepository.GetMemberAsync(username);
        return userToReturn;
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
    {
            var username = User.GetUsername();
            var user = await _userRepository.GetUserByUserNameAsync(username);

            var result = await _photoService.UploadPhotoAsync(file);

            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            photo.IsMain = user.Photos.Count == 0;

            user.Photos.Add(photo);

            if (await _userRepository.SaveAllAsync())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));
                // return _mapper.Map<PhotoDto>(photo);
            }

            return BadRequest("Problem adding Photos");
    }

     [HttpPut("set-main-photo/{photoId}")]
       public async Task<ActionResult> SetMainPhoto(int photoId)

        {
       
           var username = User.GetUsername();
           var user = await _userRepository.GetUserByUserNameAsync(username);
     
           var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);
           
            if (photo.IsMain)
            {
                return BadRequest("This is already the main photo");
            }
    
            var currentMainPhoto = user.Photos.FirstOrDefault(p => p.IsMain);
    
            if(currentMainPhoto != null)
            {
                currentMainPhoto.IsMain = false;
            }
            photo.IsMain = true;
    
            if (await _userRepository.SaveAllAsync())
            {
                return NoContent();
            }
    
            return BadRequest("Could not set photo to main");
        }     

            [HttpDelete("delete-photo/{photoId}")]
         public async Task<ActionResult> DeletePhotoAsync(int photoId)
        {
            var username = User.GetUsername();
            var user = await _userRepository.GetUserByUserNameAsync(username);
    
            var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);
            if (photo== null)
            {
                return BadRequest("Photo not found");
            }
            if(photo.IsMain)
            {
                return BadRequest("You cannot delete your main photo");
            }
            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null)
                {
                    return BadRequest(result.Error.Message);
                }
            }

            user.Photos.Remove(photo);
            
            if (await _userRepository.SaveAllAsync())
            {
                return Ok();
            }

            return BadRequest("failed to delete photo");

        } 

        

        

    }
}  


 

        
       
      
  
  

 









