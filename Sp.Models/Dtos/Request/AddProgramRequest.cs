using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models.Dtos
{
    public class AddProgramRequest
    {
        public string Name { get; set; }
        public string Duration { get; set; }
        public string DepartmentId { get; set; }
        public IList<Specialization> Specializations { get; set; } = new List<Specialization>();
        public IList<CreditLimit> CreditLimits { get; set; } = new List<CreditLimit>();
    }
}
