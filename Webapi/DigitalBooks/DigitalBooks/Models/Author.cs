using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace DigitalBooks.Models
{
    public partial class Author
    {
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int? Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Image { get; set; }
        public decimal? Price { get; set; }
        public string Publisher { get; set; }
        public bool? Active { get; set; }
        public string Contentdata { get; set; }
        public DateTime? Releasedate { get; set; }
    }
}
