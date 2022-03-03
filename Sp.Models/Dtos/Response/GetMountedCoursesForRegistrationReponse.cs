using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Response
{
    public class GetMountedCoursesForRegistrationReponse
    {
        public string StudentId { get; set; }
        public string IndexNumber { get; set; }
        public string ReferenceNumber { get; set; }
        public string Surname { get; set; }
        public string Othernames { get; set; }
        public int TotalCredit { get; set; }
        public int PendingTrails { get; set; }
        public string Level { get; set; }
        public string ProgramId { get; set; }
        public IEnumerable<GetRegisteredCoursesResponse> RegisteredCourses { get; set; }
        public IEnumerable<PendingTrailsResponse> TrailCourses { get; set; }
    }
}
