using SP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models
{
    public class GradesSettings
    {
        public GradesSettings()
        {
            GradesSettingsId = GradesSettingsId ?? Guid.NewGuid().ToString();
        }
        public string GradesSettingsId { get; set; }
        public string Grade { get; set; }
        public string GradePoint { get; set; }
        public double UpperLimit { get; set; }
        public double LowerLimit { get; set; }
        public string GradeRemarks { get; set; }
        public DateTime CommissionDate { get; set; }
        public string Type { get; set; }
        public int State { get; set; }
    }
}
