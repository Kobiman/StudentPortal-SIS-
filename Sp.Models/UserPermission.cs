using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models
{
    public class UserPermission
    {
        public UserPermission()
        {
            Id = Id ?? Guid.NewGuid().ToString();
        }
        public string Id { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public string PageId { get; set; }
        public int State { get; set; }
        public bool Deleted { get; set; }
    }
}
