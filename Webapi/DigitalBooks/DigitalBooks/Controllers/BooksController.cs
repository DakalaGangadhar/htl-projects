using DigitalBooks.Common;
using DigitalBooks.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DigitalBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class BooksController : ControllerBase
    {
        digitalbooksDBContext db = new digitalbooksDBContext();
        public static IWebHostEnvironment _environment;
        [BindProperty]
        public BookDataModel bookData { get; set; }
        private IConfiguration _config;
        public BooksController(IConfiguration config, IWebHostEnvironment environment)
        {
            _config = config;
            _environment = environment;
        }
        [HttpPost]
        [Route("create-books")]
        public IActionResult CreateBooks([FromForm]BookDataModel bookDataModel)
        {
            IActionResult response;
            if (bookDataModel.Image.Length>0)
            {
                
                if (!Directory.Exists(_environment.WebRootPath + "\\upload\\"))
                {
                    Directory.CreateDirectory(_environment.WebRootPath + "\\upload\\"); 
                }
                using (FileStream fileStream=System.IO.File.Create(_environment.WebRootPath + "\\upload\\"+ bookDataModel.Image.FileName))
                {
                    bookDataModel.Image.CopyTo(fileStream);
                    fileStream.Flush();
                    string str = "\\upload\\" + bookDataModel.Image.FileName;
                    fileStream.Dispose();
                }
                string path = "D:\\H_T_L\\Webapi\\DigitalBooks\\DigitalBooks\\wwwroot\\upload\\" + bookDataModel.Image.FileName;
                byte[] imageArray = System.IO.File.ReadAllBytes(path);
                string base64ImageRepresentation = Convert.ToBase64String(imageArray);
                

                var data = db.Authorlogins.Where(x => x.Username == bookDataModel.Referemail).FirstOrDefault();
                bookDataModel.Authorid = data.Id;
                DateTime dateTime = DateTime.UtcNow;
                bookDataModel.Releasedate = dateTime.ToString("dd/MM/yyyy"); //Convert.ToString(dateTime);
                bookDataModel.baseImage = base64ImageRepresentation;
                response = Unauthorized();
                var userdata = AuthenticateUser(bookDataModel, false);
                if (bookDataModel != null)
                {
                    var tokenString = GenerateToken(userdata);
                    response = Ok(new { token = tokenString });
                }
                return response;
            }
            else
            {
                response = Ok(new { token = "failled" });
            }
            return response;


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
            //createbooklist.Image = createbook.Image;
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
            createbooklist.Image = createbook.baseImage;

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
            //authorUpdate.Image = createbook.Image;
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