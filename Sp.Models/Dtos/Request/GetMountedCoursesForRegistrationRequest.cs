using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SP.Models.Dtos.Request
{
    public class GetMountedCoursesForRegistrationRequest : IRequest
    {
        [Required]
        public string Program { get; set; }
        [Required]
        public string Semester { get; set; }
        [Required]
        public string Level { get; set; }
        [Required]
        public string AcademicYear { get; set; }
        [Required]
        public string ErollmentOption { get; set; }
    }
}
