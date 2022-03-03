using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Request
{
    public class GetRegisteredCoursesForApprovalRequest : IRequest
    {
        public string ProgramId { get; set; }
        public string Level { get; set; }
        public string AcademicYear { get; set; }
    }
}
