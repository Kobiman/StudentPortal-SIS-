using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models.Dtos
{
    public class GetRegisteredCoursesRequest:IRequest
    {
        public string AcademicYear { get; set; }
        public string Semester { get; set; }
        public string IndexNumber { get; set; }
    }
}
