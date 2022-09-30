using Author.Models;
using MassTransit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Author.Consumers
{
    public class AuthorConsumer : IConsumer<Book>
    {
        public Task Consume(ConsumeContext<Book> context)
        {
            var data = context.Message;
            return Task.FromResult(true);
        }

    }
}
