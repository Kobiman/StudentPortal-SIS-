using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.Models
{
    public class Department
    {
        public Department()
        {
            DepartmentId = Guid.NewGuid().ToString();            
        }
        public string DepartmentId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public bool CourseMounting { get; set; }
        public int State { get; set; }
        public string SchoolId { get; set; }
        public string LecturerId { get; set; }


        public Department Edit(Department department)
        {
            Name = department.Name;
            Code = department.Code;
            SchoolId = department.SchoolId;
            LecturerId = department.LecturerId;
            return this;
        }

    }
}
