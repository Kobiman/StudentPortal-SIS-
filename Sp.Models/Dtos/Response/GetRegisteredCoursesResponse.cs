using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models.Dtos
{
    public class GetRegisteredCoursesResponse
    {
        public DateTime RegistrationDate { get; set; }
        public string StudentId { get; set; }
        public string IndexNumber { get; set; }
        public string CourseCode { get; set; }
        public int Credit { get; set; }
        public string CourseName { get; set; }
        public string Semester { get; set; }
        public string AcademicYear { get; set; }
        public bool Scoring { get; set; }
        public bool Approved { get; set; }
        public string StudentName { get; set; }
        public string Level { get; set; }
        public string MountedCourseId { get; set; }
        public string RegisteredCourseId { get; set; }
        public string Category { get; set; }
    }
}
