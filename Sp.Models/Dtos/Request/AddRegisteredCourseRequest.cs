using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SP.Models.Dtos
{
    public class AddRegisteredCoursesRequest :IRequest
    {
        public AddRegisteredCoursesRequest(IEnumerable<RegisteredCourseDto> registeredCourses)
        {
            RegisteredCourses = registeredCourses;
        }
        public IEnumerable<RegisteredCourseDto> RegisteredCourses { get; }
    }
    public class RegisteredCourseDto
    {
        [Required]
        public string StudentId { get; set; }
        [Required]
        public string MountedCourseId { get; set; }
        [Required]
        public string IndexNumber { get; set; }
        [Required]
        public string ProgramId { get; set; }
        //[Required]
        //public int Credit { get; set; }
        //[Required]
        //public string CourseName { get; set; }
        [Required]
        public string Semester { get; set; }
        [Required]
        public string AcademicYear { get; set; }
        //[Required]
        //public bool Scoring { get; set; }
        public bool Approved { get; set; }
    }
}
