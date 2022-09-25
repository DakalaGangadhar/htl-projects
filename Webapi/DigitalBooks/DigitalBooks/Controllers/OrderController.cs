using DigitalBooks.Models;
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
    public class OrderController : ControllerBase
    {
        digitalbooksDBContext db = new digitalbooksDBContext();
        [HttpPost]
        [Route("create-order")]
        public IActionResult CreateOrder([FromBody] OrderModelData orderModelData)
        {
            try
            {
                var data = db.Bookcategories.Where(x => x.CategoryName == orderModelData.CategoryName).FirstOrDefault();
                var redermaildata = db.Users.Where(d => d.Username == orderModelData.ReaderMail).FirstOrDefault();
                Orderbook orderbook = new Orderbook();
                orderbook.CardHolderName = orderModelData?.CardHolderName;
                orderbook.CardNumber = orderModelData?.CardNumber;
                orderbook.Cvv = orderModelData?.Cvv;
                orderbook.ExpireDate = orderModelData.ExpireDate;
                orderbook.CategoryId = data?.CategoryId;//Convert.ToInt32(orderModelData?.CategoryId);
                string cardID = (orderModelData.CardId != null || orderModelData.CardId != "") ? orderModelData.CardId : "0";
                orderbook.CardId =Convert.ToInt32( orderModelData?.CardId);
                orderbook.BookIb = orderModelData?.BookIb;
                orderbook.Userid = redermaildata?.Id;
                db.Orderbooks.Add(orderbook);
                db.SaveChanges();
                var response = new { Status = "Success" };
                return Ok(response);
                
            }
            catch (Exception ex)
            {
                return Ok(ex);
              
            }
            
        }
        [HttpGet]
        [Route("getorderdata")]
        public dynamic getOrderData([FromQuery]string readerEmailid)
        {
            try
            {
                dynamic getorderdata = (from u in db.Users
                                   join ob in db.Orderbooks on u.Id equals ob.Userid
                                   join b in db.Books on ob.BookIb equals b.Id
                                   join ct in db.Cardtypes on ob.CardId equals ct.Id
                                   join c in db.Bookcategories on ob.CategoryId equals c.CategoryId
                                   where (u.Username == readerEmailid)
                                   select new
                                   {
                                       userid=u.Id,
                                       reader=u.Username,
                                       authorid = b.Id,
                                       title = b.Title,
                                       Author = b.Author,
                                       Price = b.Price,                                       
                                       publisher = b.Publisher,
                                       releasedate = b.Releasedate,
                                       active = b.Active,
                                       image = b.Image,
                                       contentdata = b.Contentdata,
                                       authormail = b.Authormail,
                                       cardholdername=ob.CardHolderName,
                                       cardnumber=ob.CardNumber,
                                       cardexpire=ob.ExpireDate,
                                       cvv=ob.Cvv,
                                       cardtype=ct.CardName,
                                       category=c.CategoryName

                                   }).ToList();

                return getorderdata;
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }

        }
    }
}
