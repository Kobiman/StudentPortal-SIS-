using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos
{
    public class PermissionDto
    {
        public string PageId { get; set; }
        public string Route { get; set; }
        public string Title { get; set; }
        public string Id { get; set; }
        public string UserId { get; set; }
    }
}
