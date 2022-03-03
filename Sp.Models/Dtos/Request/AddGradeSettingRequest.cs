using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Request
{
    public class AddGradeSettingRequest
    {
        public string Grade { get; set; }
        public string GradePoint { get; set; }
        public Double UpperLimit { get; set; }
        public Double LowerLimit { get; set; }
        public string GradeRemarks { get; set; }
        public DateTime CommissionDate { get; set; }
        public string Type { get; set; }
    }
}
