using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models
{
    public class Lookup
    {
        public Lookup()
        {
           LookupId = LookupId ?? Guid.NewGuid().ToString();
        }
        public string LookupId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string InstitutionId { get; set; }
        public int State { get; set; }
    }
}
