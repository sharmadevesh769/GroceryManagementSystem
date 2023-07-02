using DAL.Data;
using Microsoft.EntityFrameworkCore;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly GroceryManagementDbContext groceryManagementDbContext;

        public CommentRepository(GroceryManagementDbContext groceryManagementDbContext)
        {
            this.groceryManagementDbContext = groceryManagementDbContext;
        }

        public async Task AddComment(Comment comment)
        {
             await groceryManagementDbContext.Comments.AddAsync(comment);
            await groceryManagementDbContext.SaveChangesAsync();
        }

        public async Task<List<Comment>> GetComment(Guid id)
        {
            return await groceryManagementDbContext.Comments.Where(c => c.ProductId == id).ToListAsync();
        }
    }
}
