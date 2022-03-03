using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models.Dtos
{
    public class GetProgramsResponse
    {
        public string ProgramId { get; set; }
        public string Name { get; set; }
        public string Duration { get; set; }
        public string DepartmentId { get; set; }
        public IList<Specialization> Specializations { get; private set; } = new List<Specialization>();
        public IList<CreditLimit> CreditLimits { get; private set; } = new List<CreditLimit>();
    }
}
