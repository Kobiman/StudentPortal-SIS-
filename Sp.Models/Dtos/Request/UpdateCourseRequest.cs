using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models.Dtos
{
    public class UpdateCourseRequest
    {
        public string CourseId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Credit { get; set; }
        public int Cred => int.Parse(Credit);
        public string DepartmentId { get; set; }
    }
}
