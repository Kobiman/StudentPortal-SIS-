using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models.Dtos
{
    public class GetDepartmentsWithCoursesResponse
    {
        public string DepartmentId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string SchoolId { get; set; }
        public string LecturerId { get; set; }
        public string SchoolName { get; set; }
        public string AcademicYear { get; set; }
        public string Semester { get; set; }
        public IEnumerable<Course> Courses { get; set; }
    }
}
