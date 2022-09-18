using System;
using System.Collections.Generic;

#nullable disable

namespace DigitalBooks.Models
{
    public partial class Createbook
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Author { get; set; }
        public string Image { get; set; }
        public string Price { get; set; }
        public string Active { get; set; }
        public string Contentdata { get; set; }
        public string Publisher { get; set; }
        public string Releasedate { get; set; }
        public int? Authorid { get; set; }
        public string Referemail { get; set; }
    }
}
