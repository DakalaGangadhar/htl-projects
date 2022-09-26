using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shared;

namespace Ticket.Producer.Microservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly IBus bus;
        public TicketController(IBus _bus)
        {
            bus = _bus;
        }
        [HttpPost]
        [Route("createticket")]
        public async Task<IActionResult> CreateTicket([FromBody]Shared.Model.Ticket ticket)
        {
            if (ticket != null)
            {
                Uri uri = new Uri("rabbitmq:localhost/ticketQueue");
                var endpoint = await bus.GetSendEndpoint(uri);
                await endpoint.Send(ticket);
                return Ok(new { status = "Your request have been recived" });
            }
            return BadRequest();
        }
    }
}
