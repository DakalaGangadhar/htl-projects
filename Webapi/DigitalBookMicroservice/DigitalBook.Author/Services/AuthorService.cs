using DigitalBook.Author.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalBook.Author.Services
{
    public class AuthorService: IAuthorService
    {
        digitalbooksDBContext db;
        public AuthorService(digitalbooksDBContext _db)
        {
            db = _db;
        }
        public List<Book> GetBooks()
        {
          return  db.Books.ToList();
        }
    }
}
