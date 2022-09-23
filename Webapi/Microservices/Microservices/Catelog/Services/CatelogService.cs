using Catelog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catelog.Services
{
    public class CatelogService : ICatelogService
    {
        catelogDBContext db;
        ICatelogService catelogService;
        public CatelogService(catelogDBContext _db)
        {
            db = _db;
           
        }

        public IEnumerable<Product> findData()
        {
            return db.Products;
        }
    }
}
