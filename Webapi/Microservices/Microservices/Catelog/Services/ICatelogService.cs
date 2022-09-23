using Catelog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catelog.Services
{
    public interface ICatelogService
    {
        IEnumerable<Product> findData();
    }
}
