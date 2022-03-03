using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Request
{
    public class UploadExamResultsRequest : IRequest
    {
        public UploadExamResultsRequest(ExamResult[] studentResults)
        {
            StudentResults = studentResults;
        }
        public ExamResult[] StudentResults;
    }
    public class ExamResult
    {
        [Required]
        public string IndexNumber { get; set; }
        [Required]
        public string AcademicYear { get; set; }
        [Required]
        public int Credit { get; set; }
        [Required]
        public string Semester { get; set; }
        [Required]
        public string ProgramId { get; set; }
        [Required]
        public string Level { get; set; }
        [Required]
        public string MountedCourseId { get; set; }
        [Required]
        public string Grade { get; set; }
        [Required]
        public float GradePoint { get; set; }
        [Required]
        public float ClassMark { get; set; }
        [Required]
        public float ExamMark { get; set; }
        [Required]
        public float TotalMark { get; set; }
        [Required]
        public string LecturerId { get; set; }
    }
}
