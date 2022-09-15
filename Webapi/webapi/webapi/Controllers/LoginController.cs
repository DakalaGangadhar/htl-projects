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
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class LoginController : ControllerBase
    {
        customerDBContext db = new customerDBContext();
        private IConfiguration _config;
        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody]Login login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login, false);
            if (user != null)
            {
                var tokenString = GenerateToken(user);
                response = Ok(new { token = tokenString });
            }
            return response;

        }
        private Login AuthenticateUser(Login lblLogin, bool IsRegister)
        {
            if (IsRegister)
            {
                db.Logins.Add(lblLogin);
                return lblLogin;
            }
            else
            {
                if (db.Logins.Any(x => x.Username == lblLogin.Username && x.Password == lblLogin.Password))
                {
                    return db.Logins.Where(x => x.Username == lblLogin.Username && x.Password == lblLogin.Password).FirstOrDefault();
                }
                else
                {
                    return null;
                }
            }
            
        }
        private string GenerateToken(Login login)
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
        public IActionResult Register(Login login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login, true);
            if (user != null)
            {
                var tokenString = GenerateToken(user);
                response = Ok(new { token = tokenString });
            }
            return response;
        }

    }
}
