using DigitalBook.Reader.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalBook.Reader.Services
{
    public class ReaderService:IReaderService
    {
        digitalbooksDBContext db;
        public ReaderService(digitalbooksDBContext _db)
        {
            db = _db;
        }
        public List<Bookcategory> GetBookCategory()
        {
            return db.Bookcategories.ToList();
        }
    }
}
