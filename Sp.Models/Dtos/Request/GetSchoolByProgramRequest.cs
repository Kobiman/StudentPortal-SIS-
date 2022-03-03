using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models.Dtos
{
    public class GetSchoolByProgramRequest:IRequest
    {
        public GetSchoolByProgramRequest(string program)
        {
            Program = program;
        }
        public string Program { get; }
    }
}
