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
        //[HttpGet]
        //public IEnumerable<Author> Get()
        //{
        //    var data = db.Authors;
        //    return data;
        //}
        //[HttpPost]
        //public IActionResult Post([FromBody] Author author)
        //{
        //    db.Authors.Add(author);
        //    db.SaveChanges();
        //    var response = new { Status = "Success" };
        //    return Ok(response);
        //}
        //[HttpDelete]
        //public IActionResult Delete([FromQuery]int authorid)
        //{
        //    var data = db.Authors.Where(x => x.Id == authorid).FirstOrDefault();
        //    db.Authors.Remove(data);
        //    db.SaveChanges();
        //    //
        //    var response = new { Status = "Success" };
        //    return Ok(response);
        //}
        //[HttpPut]
        //public IActionResult put([FromBody] Author author)
        //{
        //    var authorUpdate = db.Authors.Where(s => s.Id == author.Id).FirstOrDefault();
        //    authorUpdate.Title = author.Title;
        //    authorUpdate.Publisher = author.Publisher;
        //    authorUpdate.Price = author.Price;
        //    authorUpdate.Image = author.Image;
        //    authorUpdate.Category = author.Category;
        //    authorUpdate.Contentdata = author.Contentdata;
        //    authorUpdate.Active = author.Active;
        //    db.Authors.Update(authorUpdate);


        //    db.SaveChanges();
        //    var response = new { Status = "Success" };
        //    return Ok(response);
        //}
        [HttpPost]
        [Route("GetAuthorByReaderSearch")]
        public dynamic GetAuthorByReaderSearch([FromBody] SearchDataModel searchDataModel)
        {
            try
            {
                int categoryid = 0;
                if (searchDataModel.category=="" || searchDataModel.category == "Select Category")
                {
                    searchDataModel.category = "0";
                }
                if (searchDataModel.price==null)
                {
                    searchDataModel.price = 0;
                }
                categoryid = Convert.ToInt32(searchDataModel?.category);
                dynamic getdata = (from o in db.Books
                                   join i in db.Bookcategories
                                   on o.Categoryid equals i.CategoryId
                                   where (o.Active == true && (o.Categoryid == categoryid || o.Author == searchDataModel.author || o.Publisher == searchDataModel.publisher || o.Price == searchDataModel.price))
                                   select new
                                   {
                                       id = o.Id,
                                       title = o.Title,
                                       Author = o.Author,
                                       Price = o.Price,
                                       category = i.CategoryName,
                                       publisher = o.Publisher,
                                       releasedate = o.Releasedate,
                                       active = o.Active,
                                       image = o.Image,
                                       contentdata = o.Contentdata,
                                       authormail = o.Authormail
                                   }).ToList();

                return getdata;
            }
            catch (Exception ex)
            {
                return ex;
            }
           
        }
    }
}
