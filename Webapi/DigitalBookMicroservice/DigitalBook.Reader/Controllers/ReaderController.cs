using DigitalBook.Reader.Models;
using DigitalBook.Reader.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalBook.Reader.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReaderController : ControllerBase
    {
        IReaderService readerService;
        public ReaderController(IReaderService _readerService)
        {
            readerService = _readerService;
        }
        public List<Bookcategory> GetBookcategories()
        {
            return readerService.GetBookCategory();
        }
    }
}
