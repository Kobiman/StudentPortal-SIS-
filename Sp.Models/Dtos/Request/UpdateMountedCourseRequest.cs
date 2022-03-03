using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SP.Models.Dtos.Request
{
    public class UpdateMountedCourseRequest :IRequest
    {
        [Required]
        public string MountedCourseId { get; set; }
        [Required]
        public string EnrollmentOption { get; set; }
        [Required]
        public string Level { get; set; }
        [Required]
        public string Semester { get; set; }
        [Required]
        public string AcademicYear { get; set; }
        [Required]
        public string ProgramId { get; set; }
        [Required]
        public string AssignedBy { get; set; }
        [Required]
        public string CourseName { get; set; }
        [Required]
        public string CourseCode { get; set; }
        [Required]
        public string AssignedTo { get; set; }
        [Required]
        public string Category { get; set; }
        public bool Scoring { get; set; }
        public int Credit { get; set; }
    }
}
