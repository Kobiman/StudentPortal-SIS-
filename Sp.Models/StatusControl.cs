using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models
{
    public class StatusControl
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public DateTime Date { get; set; } = DateTime.Now;
        public bool Active { get; set; }
        public string ProgramId { get; set; }
        public string ControlType { get; set; }
        public string AcademicYear { get; set; }
        public int State { get; set; }
    }
}
