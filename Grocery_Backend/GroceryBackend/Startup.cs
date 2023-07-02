using Business.Services;
using DAL.Data;
using DAL.Repository;
using GroceryBackend.Repositories;
using GroceryBackend.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "GroceryBackend", Version = "v1" });
            });

            services.AddDbContext<GroceryManagementDbContext>(options =>
            options.UseSqlServer(Configuration.
            GetConnectionString("GMConnectionString")), ServiceLifetime.Singleton);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("jwtsecretkey.....")),
                    ValidateAudience = false,
                    ValidateIssuer = false
                };
            });

            services.AddSingleton<IProductRepository,ProductRepository > ();
            services.AddSingleton<IMyOrderRepository, MyOrderRepository>();
            services.AddSingleton<IProductServices, ProductServices>();
            services.AddSingleton<IMyOrderServices, MyOrderServices>();
            services.AddSingleton<IUserRepository, UserRepository>();
            services.AddSingleton<IUserServices, UserServices>();
            services.AddSingleton<ICartRepository, CartRepository>();
            services.AddSingleton<ICartServices, CartServices>();
            services.AddSingleton<ICommentRepository, CommentRepository>();
            services.AddSingleton<ICommentService, CommentService>();
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "GroceryBackend v1"));
            }

            app.UseHttpsRedirection();
            
            app.UseRouting();
            app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
