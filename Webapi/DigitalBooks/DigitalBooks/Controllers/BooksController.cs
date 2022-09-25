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
using System.Net.Http.Headers;
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
        public IActionResult CreateBooks([FromForm] BookDataModel bookDataModel)
        {
            try
            {
                IActionResult response;
                Guid guid = Guid.NewGuid();
                string pathImage = string.Empty;
                var file = Request.Form.Files[0];
                var foldername = "Images";
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), foldername);
                if (bookDataModel.Image.Length > 0)
                {
                    string str = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    var fileName = guid + "_" + str;// ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(foldername, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    var data = db.Authorlogins.Where(x => x.Username == bookDataModel.Referemail).FirstOrDefault();
                    bookDataModel.Authorid = data.Id;
                    DateTime dateTime = DateTime.UtcNow;
                    bookDataModel.Releasedate = dateTime.ToString("dd/MM/yyyy"); //Convert.ToString(dateTime);
                    bookDataModel.baseImage = dbPath;
                    response = Unauthorized();
                    var userdata = AuthenticateUser(bookDataModel, false);
                    if (bookDataModel != null)
                    {
                        var tokenString = GenerateToken(userdata);
                        response = Ok(new { token = tokenString });
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }
           

        }



        [HttpGet]
        [Route("getbooksdata")]
        public dynamic Get([FromQuery] string auhtoremail)
        {
            try
            {
                var createbooks = (from o in db.Books
                                   join i in db.Bookcategories
                                   on o.Categoryid equals i.CategoryId
                                   where (o.Authormail == auhtoremail)
                                   select new
                                   {
                                       id = o.Id,
                                       title = o.Title,
                                       Author = o.Author,
                                       Price = o.Price,
                                       category = i.CategoryName,
                                       publisher = o.Publisher,
                                       releasedate=o.Releasedate,
                                       active = o.Active,
                                       image = o.Image,
                                       contentdata = o.Contentdata,
                                       authormail = o.Authormail
                                   }).ToList();
                return createbooks;


            }
            catch (Exception ex)
            {

                return ex;
            }
            


        }
        private BookDataModel AuthenticateUser(BookDataModel createbook, bool IsRegister)
        {
            BookDataModel createbook1 = new BookDataModel();
            Book createbooklist = new Book();
            //createbooklist.Image = createbook.Image;
            string price = Convert.ToString(createbook.Price);
            createbooklist.Price = Decimal.Parse(price);
            createbooklist.Publisher = createbook.Publisher;
            createbooklist.Title = createbook.Title;
            createbooklist.Releasedate = DateTime.Parse(createbook.Releasedate);
            createbooklist.Contentdata = createbook.Contentdata;
            createbooklist.Categoryid =Convert.ToInt32(createbook.Category);
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
        public IActionResult put([FromForm] BookDataModel bookDataModel)
        {
            try
            {
                var authorUpdate = db.Books.Where(s => s.Id == bookDataModel.Id).FirstOrDefault();
                Guid guid = Guid.NewGuid();
                string pathImage = string.Empty;
                var file = Request.Form.Files[0];
                var foldername = "Images";
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), foldername);
                if (bookDataModel.Image.Length > 0)
                {
                    string str = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    var fileName = guid + "_" + str;// ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(foldername, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }                   
                    DateTime dateTime = DateTime.UtcNow; //Convert.ToString(dateTime);
                    bookDataModel.baseImage = dbPath;

                    authorUpdate.Title = bookDataModel.Title;
                    authorUpdate.Image = dbPath;
                    authorUpdate.Releasedate = dateTime;
                    authorUpdate.Publisher = bookDataModel.Publisher;
                    string price = Convert.ToString(bookDataModel.Price);
                    authorUpdate.Price = Decimal.Parse(price);
                    //authorUpdate.Image = createbook.Image;
                    authorUpdate.Categoryid = Convert.ToInt32(bookDataModel.Category);
                    authorUpdate.Contentdata = bookDataModel.Contentdata;
                    authorUpdate.Active = Convert.ToBoolean(bookDataModel.Active);
                    authorUpdate.Author = bookDataModel.Author;
                    db.Books.Update(authorUpdate);

                    db.SaveChanges();
                    var response = new { Status = "Success" };
                    return Ok(response);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }                
        }
        [HttpPut]
        [Route("book-block")]
        public IActionResult BookBlock([FromBody] int id)
        {
            try
            {
                var bookblobk = db.Books.Where(s => s.Id == id).FirstOrDefault();
                bookblobk.Active = false;
                db.Books.Update(bookblobk);
                db.SaveChanges();
                var response = new { Status = "Success" };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }


        }
        [HttpPut]
        [Route("book-unblock")]
        public IActionResult BookUnBlock([FromBody] int id)
        {
            try
            {
                var bookunblobk = db.Books.Where(s => s.Id == id).FirstOrDefault();
                bookunblobk.Active = true;
                db.Books.Update(bookunblobk);
                db.SaveChanges();
                var response = new { Status = "Success" };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }


        }
    }
}