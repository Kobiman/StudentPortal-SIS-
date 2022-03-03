using System;

namespace SP.Models
{
    public class StudentResult
    {
        public StudentResult()
        {
            Date = DateTime.Now;
            ExamResultId = Guid.NewGuid().ToString();
        }
        public DateTime Date { get; set; }
        public string ExamResultId { get; set; }
        public string IndexNumber { get; set; }
        public string StudentId { get; set; }
        public string AcademicYear { get; set; }
        public string Semester { get; set; }
        public int Credit { get; set; }
        public string ProgramId { get; set; }
        public string Level { get; set; }
        public string MountedCourseId { get; set; }
        public string Grade { get; set; }
        public float GradePoint { get; set; }
        public float ClassMark { get; set; }
        public float ExamMark { get; set; }
        public float TotalMark { get; set; }
        public bool Scoring { get; set; }
        public string LecturerId { get; set; }
        public string Comment { get; set; }
        public string Status { get; set; }
        public int State { get; set; }
    }
}