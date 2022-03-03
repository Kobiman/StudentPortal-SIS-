using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Response
{
   public class GetGradeSettingsResponse
    {
        public string Grade { get; set; }
        public string GradePoint { get; set; }
        public string UpperLimit { get; set; }
        public string LowerLimit { get; set; }
        public string GradeRemarks { get; set; }
        public DateTime CommissionDate { get; set; }
        public string Type { get; set; }
    }
}
