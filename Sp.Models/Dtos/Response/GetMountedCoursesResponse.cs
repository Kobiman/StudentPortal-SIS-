using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models.Dtos
{
    public class GetMountedCoursesResponse
    {
        public string ProgramOfStudy { get; set; }
        public string AcademicYear { get; set; }
        public string Semester { get; set; }
        public string EnrollmentOption { get; set; }
        public string Level { get; set; }
        public string AssignedBy { get; set; }
        public string CourseName { get; set; }
        public string CourseCode { get; set; }
        public string AssignedTo { get; set; }
        public string Category { get; set; }
        public bool Scoring { get; set; }
        public int Credit { get; set; }
        public string MountedCourseId { get; set; }
        public string Specialization { get; set; }
    }
}
