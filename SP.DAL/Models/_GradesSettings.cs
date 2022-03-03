using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.DAL.Models
{
    public class _GradesSettings
    {
        public string GradesSettingsId { get; set; }
        public string Grade { get; set; }
        public string GradePoint { get; set; }
        public double UpperLimit { get; set; }
        public double LowerLimit { get; set; }
        public string GradeRemarks { get; set; }
        public DateTime CommissionDate { get; set; }
        //public string ProgramId { get; set; }
    }
}
