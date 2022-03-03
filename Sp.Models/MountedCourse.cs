using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models
{
    public class MountedCourse 
    {
        public MountedCourse()
        {
            MountedCourseId = Guid.NewGuid().ToString();
            Date = DateTime.Now;
        }

        public string MountedCourseId { get; set; }
        public string EnrollmentOption { get; set; }
        public string Level { get; set; }        
        public string Semester { get; set; }
        public string AcademicYear { get; set; }
        public string ProgramId { get; set; }
        public string AssignedBy { get; set; }
        public DateTime Date { get; set; }
        public string CourseName { get; set; }
        public string CourseCode { get; set; }
        public string AssignedTo { get; set; }
        public string Specialization { get; set; }
        //Elective, Option, General, OptionalElective
        public string Category { get; set; }
        public bool Scoring { get; set; }
        public int Credit { get; set; }
        public int State { get; set; }
        public bool Deleted { get; set; }

    }
}
