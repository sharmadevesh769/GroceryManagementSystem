using DAL.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository commentRepository;

        public CommentService(ICommentRepository commentRepository)
        {
            this.commentRepository = commentRepository;
        }
        public Task AddComment(Comment comment)
        {
            return commentRepository.AddComment(comment);
        }

        public Task<List<Comment>> GetComment(Guid id)
        {
            return commentRepository.GetComment(id);
        }
    }
}
