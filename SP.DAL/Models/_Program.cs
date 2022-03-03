using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.DAL.Models
{
    public class _Program
    {
        public string ProgramId { get; set; }
        public string Name { get; set; }
        //public string Code { get; set; }
        public string Duration { get; set; }
        public int MaxCredit { get; set; }
        public int MinCredit { get; set; }
        public string DepartmentId { get; set; }
    }
}
