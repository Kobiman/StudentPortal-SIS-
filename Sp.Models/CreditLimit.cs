using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.Models
{
    public class CreditLimit
    {
        public string CreditLimitId { get; set; } = Guid.NewGuid().ToString();
        public string ProgramId { get; set; }
        //Number of options to select
        public int MaxCredit { get; set; }
        public int MinCredit { get; set; }

        public string Level { get; set; }
        public int State { get; set; }
        public bool Deleted { get; set; }
    }
}
