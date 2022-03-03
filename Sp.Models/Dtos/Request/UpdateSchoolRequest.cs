using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models.Dtos
{
    public class UpdateSchoolRequest
    {
        public string SchoolId { get; set; }
        public string Name { get; set; }
        public string AcademicYear { get; set; }
        public string Semester { get; set; }
        public bool RegistrationActivated { get; set; }
        public bool ResultUploaded { get; set; }
        public string InstitutionId { get; set; }
        public string LecturerId { get; set; }
        public int State { get; set; }

    }
}
