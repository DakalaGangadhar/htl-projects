using DigitalBook.Author.Models;
using DigitalBook.Author.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalBook.Author.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        IAuthorService authorService;
        public AuthorController(IAuthorService _authorService)
        {
            authorService = _authorService;
        }
        public List<Book> GetBooks()
        {
            return authorService.GetBooks();
        }
    }
}
