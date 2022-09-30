using DigitalBooks.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DigitalBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   // [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class AuthorController : ControllerBase
    {
        digitalbooksDBContext db = new digitalbooksDBContext();
        private IConfiguration _config;
        public AuthorController(IConfiguration config)
        {
            _config = config;
        }
        [HttpPost]
        [Route("author-login")]
        public IActionResult Login(Authorlogin authorlogin)
        {
            IActionResult response = Unauthorized();
            var userdata = AuthenticateUser(authorlogin, false);
            if (authorlogin != null)
            {
                var tokenString = GenerateToken(userdata);
                response = Ok(new { token = tokenString });
            }
            return response;
        }
        private Authorlogin AuthenticateUser(Authorlogin authorlogin, bool IsRegister)
        {
            if (IsRegister)
            {
                db.Authorlogins.Add(authorlogin);
                db.SaveChanges();
                return authorlogin;
            }
            else
            {
                if (db.Authorlogins.Any(x => x.Username == authorlogin.Username && x.Password == authorlogin.Password))
                {
                    return db.Authorlogins.Where(x => x.Username == authorlogin.Username && x.Password == authorlogin.Password).FirstOrDefault();
                }
                else
                {
                    return null;
                }
            }

        }
        private string GenerateToken(Authorlogin authorlogin)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["jwt:Issuer"],
                _config["jwt:Audience"],
                null,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        [HttpPost]
        [Route("author-register")]
        public IActionResult Register([FromBody] Authorlogin authorlogin)
        {
            IActionResult response = Unauthorized();
            var userdata = AuthenticateUser(authorlogin, true);
            if (authorlogin != null)
            {
               // db.Add(authorlogin);
                //db.SaveChanges();
                var tokenString = GenerateToken(userdata);
                response = Ok(new { token = tokenString });
            }
            return response;
        }
        

    }
}
