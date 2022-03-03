using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models
{
    public class Page
    {
        public Page()
        {
            Id = Id ?? Guid.NewGuid().ToString();
    }
        public string Id { get; set; }
        public string Title { get; set;}
        public string Route { get; set;}
        public int State { get; set;}
    }
}
