using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models.Dtos.Response
{
    public class GetSchoolByProgramResponse
    {
        public string SchoolId { get; set; }
        public string Name { get; set; }
        public string AcademicYear { get; set; }
        public string Semester { get; set; }
        public bool RegistrationStatus { get; set; }
        public bool ResultUpload { get; set; }
        public string InstitutionId { get; set; }
        public string LecturerId { get; set; }
    }
}
