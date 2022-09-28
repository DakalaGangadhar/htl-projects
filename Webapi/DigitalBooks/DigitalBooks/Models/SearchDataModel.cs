using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalBooks.Models
{
    public class SearchDataModel
    {
        public string category { get; set; } = "0";
        public string author { get; set; }
        public string publisher { get; set; }
        public int? price { get; set; }
        public string id { get; set; }
    }
}
