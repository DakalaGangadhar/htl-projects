using DigitalBooks.Common;
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
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
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
        public IActionResult CreateBooks([FromBody] BookDataModel createbook)
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
        public IEnumerable<Book> Get([FromQuery]string auhtoremail)
        {
            List<Book> createbooks = db.Books.Where(x => x.Authormail == auhtoremail && x.Active==true).ToList();
            BookDataModel bookDataModel = new BookDataModel();
            
            return createbooks;
        }
        private BookDataModel AuthenticateUser(BookDataModel createbook, bool IsRegister)
        {
            BookDataModel createbook1 = new BookDataModel();
            Book createbooklist = new Book();
            createbooklist.Image = createbook.Image;
            string price = (createbook.Price != null || createbook.Price != "") ? createbook.Price : "0.00";
            createbooklist.Price = Decimal.Parse(price);
            createbooklist.Publisher = createbook.Publisher;
            createbooklist.Title = createbook.Title;
            createbooklist.Releasedate = DateTime.Parse(createbook.Releasedate);
            createbooklist.Contentdata = createbook.Contentdata;
            createbooklist.Category = createbook.Category;
            createbooklist.Author = createbook.Author;
            createbooklist.Active = Convert.ToBoolean(createbook.Active);
            createbooklist.Authorid = createbook.Authorid;
            createbooklist.Authormail = createbook.Referemail;

            db.Books.Add(createbooklist);
            db.SaveChanges();
            return createbook1;

        }
        private string GenerateToken(BookDataModel createbook)
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
            var data = db.Books.Where(x => x.Id == authorid).FirstOrDefault();
            db.Books.Remove(data);
            db.SaveChanges();
            //
            var response = new { Status = "Success" };
            return Ok(response);
        }
        [HttpPut]
        [Route("bookupdate")]
        public IActionResult put([FromBody] BookDataModel createbook)
        {
            var authorUpdate = db.Books.Where(s => s.Id == createbook.Id).FirstOrDefault();
            authorUpdate.Title = createbook.Title;
            authorUpdate.Publisher = createbook.Publisher;
            authorUpdate.Price = Decimal.Parse(createbook.Price);
            authorUpdate.Image = createbook.Image;
            authorUpdate.Category = createbook.Category;
            authorUpdate.Contentdata = createbook.Contentdata;
            authorUpdate.Active = Convert.ToBoolean(createbook.Active);
            authorUpdate.Author = createbook.Author;
            db.Books.Update(authorUpdate);


            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }
    }
}