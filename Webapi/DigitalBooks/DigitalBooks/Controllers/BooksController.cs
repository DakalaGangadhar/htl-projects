using DigitalBooks.Models;
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
    public class BooksController : ControllerBase
    {
        digitalbooksDBContext db = new digitalbooksDBContext();
        private IConfiguration _config;
        public BooksController(IConfiguration config)
        {
            _config = config;
        }
        [HttpPost]
        [Route("create-books")]
        public IActionResult CreateBooks([FromBody] Createbook createbook)
        {
            var data = db.Authorlogins.Where(x => x.Username == createbook.Referemail).FirstOrDefault();
            createbook.Authorid = data.Id;
            DateTime dateTime= DateTime.UtcNow;
            createbook.Releasedate = dateTime.ToString("dd/MM/yyyy"); //Convert.ToString(dateTime);
            IActionResult response = Unauthorized();
            var userdata = AuthenticateUser(createbook, false);
            if (createbook != null)
            {
                var tokenString = GenerateToken(userdata);
                response = Ok(new { token = tokenString });
            }
            return response; ;
        }
        [HttpGet]
        [Route("getbooksdata")]
        public IEnumerable<Createbook> Get([FromQuery]string auhtoremail)
        {
            List<Createbook> createbooks = db.Createbooks.Where(x => x.Referemail == auhtoremail).ToList();
            return createbooks;
        }
        private Createbook AuthenticateUser(Createbook createbook, bool IsRegister)
        {
            db.Createbooks.Add(createbook);
            db.SaveChanges();
            return createbook;

        }
        private string GenerateToken(Createbook createbook)
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
        [HttpDelete]
        [Route("book-delete")]
        public IActionResult BookDelete([FromQuery] int authorid)
        {
            var data = db.Createbooks.Where(x => x.Id == authorid).FirstOrDefault();
            db.Createbooks.Remove(data);
            db.SaveChanges();
            //
            var response = new { Status = "Success" };
            return Ok(response);
        }
        [HttpPut]
        [Route("bookupdate")]
        public IActionResult put([FromBody] Createbook createbook)
        {
            var authorUpdate = db.Createbooks.Where(s => s.Id == createbook.Id).FirstOrDefault();
            authorUpdate.Title = createbook.Title;
            authorUpdate.Publisher = createbook.Publisher;
            authorUpdate.Price = createbook.Price;
            authorUpdate.Image = createbook.Image;
            authorUpdate.Category = createbook.Category;
            authorUpdate.Contentdata = createbook.Contentdata;
            authorUpdate.Active = createbook.Active;
            authorUpdate.Author = createbook.Author;
            db.Createbooks.Update(authorUpdate);


            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }
    }
}