using System;
using System.Collections.Generic;

#nullable disable

namespace DigitalBooks.Models
{
    public partial class Author
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Image { get; set; }
        public decimal? Price { get; set; }
        public string Publisher { get; set; }
        public bool? Active { get; set; }
        public string Author1 { get; set; }
        public string Contentdata { get; set; }
        public DateTime? Releasedate { get; set; }
    }
}
