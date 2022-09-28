using DigitalBook.Reader.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalBook.Reader.Services
{
    public interface IReaderService
    {
        List<Bookcategory> GetBookCategory();
    }
}
