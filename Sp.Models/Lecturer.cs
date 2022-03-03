using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models
{
    public class Lecturer
    {
        public Lecturer()
        {
            LecturerId = LecturerId ?? Guid.NewGuid().ToString();
        }
        public string LecturerId { get; set; }
        public string StaffId { get; set; }
        public string Name { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string DepartmentId { get; set; }
        public int State { get; set; }
        public bool Status { get; set; }
    }
}
