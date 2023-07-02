using Business.Services;
using DAL.Data;
using DAL.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IProductServices productServices;
        private readonly ICommentService commentService;
  
        private readonly IUserServices userServices;

        public CommentController(IProductServices productServices,ICommentService commentService, IUserServices userServices)
        {
            this.productServices = productServices;
            this.commentService = commentService;
            this.userServices = userServices;
        }
        
        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] Comment comment)
        {
            if (comment == null)
            {
                return BadRequest("Comment is Empty");
            }
            await commentService.AddComment(comment);
            
            return Ok(new { message = "Comment Added" });
        }

        [HttpGet("{productId}")]
        public async Task<IActionResult> GetComments(Guid productId)
        {
            var result = new List<object>();
            var comments = await commentService.GetComment(productId);

            foreach (var comment in comments)
            {
                var user = await userServices.GetUserByEmail(comment.UserId);
                var Description = comment.Description;
                var UserName = user.Name;

                var commentData = new
                {
                    Description = Description,
                    UserName = UserName
                };

                result.Add(commentData);
            }

            return Ok(result);
        }

    }
}
