using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Request
{
    public class GetMountedCoursesForResultsUploadRequest : IRequest
    {
        public string EnrollmentOption { get; set; }
        public string AcademicYear { get; set; }
        public string Semester { get; set; }
        public string LecturerId { get; set; }
    }
}
