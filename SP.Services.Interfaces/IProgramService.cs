using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces
{
    public interface IProgramService
    {
        IResult AddProgram(AddProgramRequest request);
        IResult GetProgram(string programId);
        IResult GetPrograms();
        IResult UpdateProgram(UpdateProgramRequest request);
        IResult GetProgramByName(string name);
    }
}
