using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces.Repository
{
    public interface IInstitutionRepository
    {
        bool AddInstitution(Institution institution);
        Institution GetInstitution(string institutionId);
        IEnumerable<Institution> GetInstitutions();
        bool UpdateInstitution(UpdateInstitutionRequest institution);
    }
}
