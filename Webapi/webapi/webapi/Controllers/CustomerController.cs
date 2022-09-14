using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        customerDBContext db = new customerDBContext();
        [HttpGet]
        public IEnumerable<Customer> get()
        {
            return db.Customers;
        }
        [HttpPost]
        public IActionResult post([FromBody] Customer customer)
        {            
            db.Customers.Add(customer);
            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }
        [HttpPut]
        public IActionResult put([FromBody]Customer customer)
        {
            var custUpdate = db.Customers.Where(s=>s.Id==customer.Id).FirstOrDefault();
            custUpdate.CustomerName = customer.CustomerName;
            custUpdate.CustomerCode = customer.CustomerCode;
            custUpdate.CustomerAmount = customer.CustomerAmount;
            db.Customers.Update(custUpdate);


            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }
        [HttpDelete]
        public IActionResult Delete([FromQuery]int custId)
        {
            var deleteData = db.Customers.Where(i => i.Id == custId).FirstOrDefault();
            db.Customers.Remove(deleteData);
            db.SaveChanges();
            var res = new { status = "Success" };
            return Ok();
        }

    }
}
