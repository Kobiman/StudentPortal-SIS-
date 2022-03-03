using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models.Dtos
{
    public class GetRegisteredCoursesDto
    {
        public DateTime RegistrationDate { get; set; }
        public string AcademicYear { get; set; }
        public bool Approved { get; set; }
        public string IndexNumber { get; set; }
        public string Semester { get; set; }
        public string Level { get; set; }
        public string StudentId { get; set; }
        public string StudentName { get; set; }
        public string ProgramOfStudy { get; set; }
        public string MountedCourseId { get; set; }
        public string RegisteredCourseId { get; set; }
    }
}
