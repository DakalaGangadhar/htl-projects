using DigitalBook.Author.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalBook.Author.Services
{
    public interface IAuthorService
    {
        List<Book> GetBooks();
    }
}
