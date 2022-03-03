using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Request
{
    public class GetTrailListRequest:IRequest
    {
        [Required]
         public  string IndexNumber { get; set; }
        
        [Required]
        public string Semester { get; set; }
        [Required]
        public string AcademicYear { get; set; }
    }
}
