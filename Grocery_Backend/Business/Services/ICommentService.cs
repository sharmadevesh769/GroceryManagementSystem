
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public interface ICommentService
    {
        public Task AddComment(Comment comment);
        public Task<List<Comment>> GetComment(Guid id);
    }
}
