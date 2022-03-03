using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Response
{
    public class PendingTrailsResponse
    {
        public string MountedCourseId { get; set; }
        public string StudentId { get; set; }
        public string CourseCode { get; set; }
        public string Credit { get; set; }
        public string CourseName { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string Grade { get; set; }
    }
}
