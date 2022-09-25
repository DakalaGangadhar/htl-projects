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
                Orderbook orderbook = new Orderbook();
                orderbook.CardHolderName = orderModelData.CardHolderName;
                orderbook.CardNumber = orderModelData.CardNumber;
                orderbook.Cvv = orderModelData.Cvv;
                orderbook.ExpireDate = orderModelData.ExpireDate;
                //orderbook.CategoryId =Convert.ToInt32(orderModelData?.CategoryId);
                string cardID = (orderModelData.CardId != null || orderModelData.CardId != "") ? orderModelData.CardId : "0";
                orderbook.CardId =Convert.ToInt32( orderModelData.CardId);
                orderbook.BookIb = orderModelData.BookIb;
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
    }
}
