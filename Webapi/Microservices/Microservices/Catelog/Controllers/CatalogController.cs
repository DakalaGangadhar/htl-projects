using Catelog.Models;
using Catelog.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catelog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController : ControllerBase
    {
        ICatelogService catalogService;
        public CatalogController(ICatelogService _catalogService)
        {
            catalogService = _catalogService;
        }
        [HttpGet]
        public IEnumerable<Product> get()
        {
            return catalogService.findData();
        }
    }
}
