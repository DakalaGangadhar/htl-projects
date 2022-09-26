using MassTransit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ticket.Consumer.Microservice.Consumers
{
    public class TicketConsumer : IConsumer<Shared.Model.Ticket>
    {
            public Task Consume(ConsumeContext<Shared.Model.Ticket> context)
            {
                var data = context.Message;
                return Task.FromResult(true);
            }
        
    }
}
