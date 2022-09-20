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
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DigitalBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class UserLoginController : ControllerBase
    {
        digitalbooksDBContext db = new digitalbooksDBContext();
        private IConfiguration _config;
        public UserLoginController(IConfiguration config)
        {
            _config = config;
        }
        [HttpPost]
        [Route("login-user")]
        public IActionResult Login(User user)
        {
            IActionResult response = Unauthorized();
            var userdata = AuthenticateUser(user, false);
            if (user != null)
            {
                var tokenString = GenerateToken(userdata);
                response = Ok(new { token = tokenString });
            }
            return response;
        }
        private User AuthenticateUser(User user, bool IsRegister)
        {
            if (IsRegister)
            {
                db.Users.Add(user);
                return user;
            }
            else
            {
                if (db.Users.Any(x => x.Username == user.Username && x.Password == user.Password))
                {
                    return db.Users.Where(x => x.Username == user.Username && x.Password == user.Password).FirstOrDefault();
                }
                else
                {
                    return null;
                }
            }

        }
        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var token = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Username)
                }),
                Expires = DateTime.Now.AddMinutes(120),
                SigningCredentials = credentials
            };
            var TokenHandler = new JwtSecurityTokenHandler();
            var tokenGenerated = TokenHandler.CreateToken(token);
            return TokenHandler.WriteToken(tokenGenerated).ToString();
        }
        [HttpPost]
        [Route("register-user")]
        public IActionResult Register([FromBody]User user)
        {
            IActionResult response = Unauthorized();
            var userdata = AuthenticateUser(user, true);
            if (user != null)
            {
                db.Add(user);
                db.SaveChanges();
                var tokenString = GenerateToken(userdata);
                response = Ok(new { token = tokenString });
            }
            return response;
        }
    }
}
