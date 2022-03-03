using SP.Models.Dtos;
using System;

namespace SP.Models
{
    public class RegisteredCourse 
    {
        public RegisteredCourse()
        {
            RegisteredCourseId ??= Guid.NewGuid().ToString();
        }
        public string RegisteredCourseId { get; set; } 
        public DateTime RegistrationDate { get; set; } = DateTime.Now;
        public string StudentId { get; set; }
        public string ProgramId { get; set; }
        public string Semester { get; set; }
        public string MountedCourseId { get; set; }
        public string AcademicYear { get; set; }
        public bool Approved { get; set; }
        public int State { get; set; }
        public bool Deleted { get; set; }
    }
}