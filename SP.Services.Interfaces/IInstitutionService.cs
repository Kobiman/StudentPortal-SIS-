using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces
{
    public interface IInstitutionService
    {
        IResult AddInstitution(Institution institution);
        IResult GetInstitution(string institutionId);
        IResult GetInstitutions();
        IResult UpdateInstitution(UpdateInstitutionRequest institution);
    }
}
