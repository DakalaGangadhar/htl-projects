using DigitalBooks.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalBooks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class UserDataController : ControllerBase
    {
        digitalbooksDBContext db = new digitalbooksDBContext();
        [HttpGet]
        public IEnumerable<Author> Get()
        {
            return db.Authors;
        }
        [HttpPost]
        public IActionResult Post([FromBody] Author author)
        {
            db.Authors.Add(author);
            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }
        [HttpDelete]
        public IActionResult Delete([FromQuery]int authorid)
        {
            var data = db.Authors.Where(x => x.Id == authorid).FirstOrDefault();
            db.Authors.Remove(data);
            db.SaveChanges();
            //
            var response = new { Status = "Success" };
            return Ok(response);
        }
        [HttpPut]
        public IActionResult put([FromBody] Author author)
        {
            var authorUpdate = db.Authors.Where(s => s.Id == author.Id).FirstOrDefault();
            authorUpdate.Title = author.Title;
            authorUpdate.Publisher = author.Publisher;
            authorUpdate.Price = author.Price;
            authorUpdate.Image = author.Image;
            authorUpdate.Category = author.Category;
            authorUpdate.Contentdata = author.Contentdata;
            authorUpdate.Active = author.Active;
            db.Authors.Update(authorUpdate);


            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }
        [HttpGet]
        [Route("GetAuthorByReaderSearch")]
        public IEnumerable<Book> GetAuthorByReaderSearch([FromQuery]string category,string author,string publisher, int price)
        {
            List<Book> getdata= db.Books.Where(x => x.Active == true && (x.Category == category || x.Author == author || x.Publisher == publisher || x.Price == price)).ToList();

            return getdata;
        }
    }
}
