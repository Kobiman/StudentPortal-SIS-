using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SP.Models.Dtos
{
    public class GetExamResultsRequest :IRequest
    {
        [Required]
        public string Program { get; set; }
        [Required]
        public string AcademicYear { get; set; }
        [Required]
        public string Level { get; set; }
        [Required]
        public string Semester { get; set; }
    }
}
