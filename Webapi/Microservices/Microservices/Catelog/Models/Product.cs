using System;
using System.Collections.Generic;

#nullable disable

namespace Catelog.Models
{
    public partial class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public string ProductCategory { get; set; }
    }
}
