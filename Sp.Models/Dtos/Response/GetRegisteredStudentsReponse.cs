using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Response
{
    public class GetRegisteredStudentsReponse
    {
        public string Indexnumber { get; set; }
        public string Name { get; set; }
        public string Level { get; set; }
        public string ProgramId { get; set; }

    }
}
